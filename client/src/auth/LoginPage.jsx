import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const router = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/api/auth/login/';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, 
          password: password 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('login successfully');
        router('/dashboard');
        window.localStorage.setItem('user_id', data.id)
        window.localStorage.setItem('token', data.token)
        
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Login failed"}`); 
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.'); 
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f8f8f8",
      color: "#333"
    }}>
      <h1 style={{
        fontSize: "2.5rem",
        fontWeight: "bold",
        color: "black",
        marginBottom: "20px"
      }}>
        Admin Login
      </h1>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: "300px"
      }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
            style={{
              width: "95%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "1rem"
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
            style={{
              width: "95%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "1rem"
            }}
            required
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button
            type="submit" 
            style={{
              padding: "10px",
              fontSize: "1.2rem",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              width: "50%"
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
