import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const router = useNavigate(); 


  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Dashboard</h1>
      <ul className="nav-links" >
        <Link to="/dashboard" className="nav-item">
          <li>Product</li>
        </Link>
        <Link to="/Category" className="nav-item">
          <li>Category
          </li>
        </Link>
        <div className="nav-item" onClick={() => {
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('user_id')
          router('/')
        }}>
          <li>
            logout
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
