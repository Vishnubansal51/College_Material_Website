



// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/Authcontext";

import Sidebar from "./Sidebar";
import Login from "./Login";
import Signup from "./Signup";
import logo from "../sprite/navbarLogo.png";

const NavigationBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [formType, setFormType] = useState("");

  const openSidebar = (type) => {
    setFormType(type);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <Link className="logo-img mx-3" to="/">
          <img src={logo} alt="CampusFusion" className="nav-logo" />
        </Link>
        <div className="nav-links-container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/materials">
                Material
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upload">
                Upload
              </Link>
            </li>
          </ul>
        </div>
        <div className="auth-buttons-container">
          {isAuthenticated ? (
            <Link className="nav-link" to="/" onClick={logout}>
              Logout
            </Link>
          ) : (
            <>
              <button className="nav-link btn btn-link" onClick={() => openSidebar("Login")}>
                Login
              </button>
              <button className="nav-link btn btn-link " onClick={() => openSidebar("Sign Up")}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar}>
        {formType === "Login" ? (
          <Login formType="Login" closeSidebar={closeSidebar} />
        ) : (
          <Signup formType="Sign Up" closeSidebar={closeSidebar} />
        )}
      </Sidebar>
    </>
  );
};

export default NavigationBar;