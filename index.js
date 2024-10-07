const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Client } = require('ssh2');
const scp = require('scp2');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('installSoftware', (data) => {
    const { ip, port, username, password, serverType } = data;
    console.log(`Attempting to install ${serverType} on ${ip}`);

    const conn = new Client();

    conn.on('ready', () => {
      console.log(`SSH connection established with ${username}@${ip}`);
      socket.emit('installProgress', { output: `Connected to ${ip}.` });

      // Copy install.sh to the server
      scp.scp('install.sh', {
        host: ip,
        username: username,
        password: password,
        path: '/tmp/install.sh'
      }, (err) => {
        if (err) {
          socket.emit('installProgress', { output: 'Error uploading script: ' + err.message });
          conn.end();
          return;
        }

        // Make the script executable
        conn.exec(`chmod +x /tmp/install.sh`, (err) => {
          if (err) {
            socket.emit('installProgress', { output: 'Error making script executable: ' + err.message });
            conn.end();
            return;
          }

          // Execute the installation script with the server type as an argument
          const command = `/tmp/install.sh ${serverType}`;
          socket.emit('installProgress', { output: `Executing installation script for ${serverType}...` });

          conn.exec(command, (err, stream) => {
            if (err) {
              console.error('Error executing command:', err);
              socket.emit('installProgress', { output: 'Error executing command: ' + err.message });
              conn.end();
              return;
            }

            stream.on('close', (code, signal) => {
              console.log(`Stream :: close :: code: ${code}, signal: ${signal}`);
              conn.end();
              socket.emit('installComplete', { message: `Installation completed on ${ip}` });
            }).on('data', (data) => {
              console.log('STDOUT: ' + data);
              socket.emit('installProgress', { output: data.toString() });
            }).stderr.on('data', (data) => {
              console.error('STDERR: ' + data);
              socket.emit('installProgress', { output: 'ERROR: ' + data.toString() });
            });
          });
        });
      });
    })
    .on('error', (err) => {
      console.error('SSH connection error:', err);
      socket.emit('installProgress', { output: 'SSH connection error: ' + err.message });
    })
    .connect({
      host: ip,
      port: port,
      username: username,
      password: password,
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Listening on port 4000');
});
