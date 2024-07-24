
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";
const Login = ({ formType, closeSidebar }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    

      // const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
      //   email,
      //   password,

      // });
    
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/login`, 
        { email, password }
      );
      toast.success(response.data.message || "Login Successfully");

 
      login(response.data.token);
      setEmail("");  
      setPassword(""); 
      closeSidebar();
      navigate("/upload");
    } catch (error) {
     console.log(error.message)
      setErrorMessage(error.response.data.message); 
    }
  };
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(""); 
      }, 5000);
      return () => clearTimeout(timer); 
    }
  }, [errorMessage]);

  return (
    <>
      <form onSubmit={handleLogin}>
        {errorMessage && ( 
          <div className="error-message">
            <span role="img" aria-label="error">
              ❌
            </span>{" "}
            {errorMessage}
          </div>
        )}
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           <i
            className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            aria-hidden="true"
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
