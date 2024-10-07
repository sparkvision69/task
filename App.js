import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('22');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverType, setServerType] = useState('');
  const [installOutput, setInstallOutput] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');

  const handleServerChange = (event) => {
    setServerType(event.target.value);
  };

  const handleGenerateScript = () => {
    socket.emit('generateScript', {
      serverType
    });
  };

  const handleInstall = () => {
    socket.emit('installSoftware', {
      ip,
      port,
      username,
      password,
      serverType,
      script: generatedScript
    });
  };

  useEffect(() => {
    socket.on('installScript', (data) => {
      setGeneratedScript(data.script);
      setInstallOutput('');
    });

    socket.on('installProgress', (data) => {
      setInstallOutput((prev) => prev + data.output + '\n');
    });

    socket.on('installComplete', (data) => {
      alert(data.message);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.off('installScript');
      socket.off('installProgress');
      socket.off('installComplete');
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript);
    alert('Script copied to clipboard!');
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h4 style={styles.title}>Generate and Install Software on Server</h4>
        <input
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder='IP Address'
          style={styles.input}
        />
        <input
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder='Port (default 22)'
          style={styles.input}
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          style={styles.input}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password (optional)'
          type='password'
          style={styles.input}
        />
        <select
          value={serverType}
          onChange={handleServerChange}
          style={styles.input}
        >
          <option value="">Select Server Type</option>
          <option value="nglamp">NGLAMP</option>
          <option value="lamp">LAMP</option>
          <option value="nlamp">NLAMP</option>
          <option value="plesk">Plesk</option>
          <option value="cpanel">Cpanel</option>
          <option value="virtualmin">Virtualmin</option>
          <option value='nodejs'>Node.js</option>
        </select>

        <button onClick={handleGenerateScript} style={styles.button}>
          Generate Script
        </button>

        <button onClick={handleInstall}  style={styles.button}>
          Install
        </button>

        {generatedScript && (
          <>
            <div style={styles.codeBox}>
              <code>{generatedScript}</code>
            </div>
            <button onClick={copyToClipboard} style={styles.copyButton}>
              Copy to Clipboard
            </button>
          </>
        )}

        {installOutput && (
          <div style={styles.outputBox}>
            <code>{installOutput}</code>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  box: {
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '18px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid red',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    margin: '5px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #007BFF',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
  codeBox: {
    marginTop: '20px',
    textAlign: 'left',
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  copyButton: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #007BFF',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
  outputBox: {
    marginTop: '20px',
    textAlign: 'left',
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
};

export default App;
