
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";


const Signup = ({ formType, closeSidebar }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {

 
  
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/sign-up`, {
        email,
        password,
        name,
      });
    
      toast.success(
        response.data.message ||
          "Signup successful! Check your email for verification."
      );
     
      setEmail(""); 
      setPassword(""); 
      setName(""); 
      closeSidebar();

    } catch (error) {
      toast.error(error.response?.data?.message || "Error signing up.");
    }
  };

  return (
    <>
    <form onSubmit={handleSignup}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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

      <button type="submit">Sign Up</button>
    </form>
    <ToastContainer />
    </>
  );
};

export default Signup;

