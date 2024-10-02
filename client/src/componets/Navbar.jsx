import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: 'space-around',
      alignItems: 'center',
      color: "#333"
    }}>
      <h1 style={{
        fontSize: "3rem",
        fontWeight: "bold",
        color: "black"
      }}>
        E-commerce
      </h1>
      <div style={{
        marginTop: "30px",
        display: "flex",
        gap: "15px"
      }}>
        <Link to="/login">
          <button style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease"
          }}>
            Login
          </button>
        </Link>
        <Link to="/register">
          <button style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease"
          }}>
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
