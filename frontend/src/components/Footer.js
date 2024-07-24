
import React ,{useEffect}from 'react';
import './Footer.css';
import { Link, useLocation } from 'react-router-dom';
import logo from  '../sprite/logo.png'; 
const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });; // Scroll to top whenever the location changes
  }, [location]);
 
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>How can we help?</h4>
          <p>Contact us anytime</p>
        </div>
        <div className="footer-section">
          <h4>Call us</h4>
          <p>(+91) 9780848266</p>
        </div>
        <div className="footer-section">
          
         
          <h4>Send us a message</h4>
        <a href="mailto:bansalvishnu51@gmail.com">bansalvishnu51@gmail.com</a>
        </div>
        <div className="footer-section">
          <h4>Follow us</h4>
          <div className="social-icons">
        
            <a href ="https://www.linkedin.com/in/vishnu-bansal-90a3a1225" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
        
            <a href="https://www.instagram.com/bansalvishnu1111" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href  ="https://github.com/Vishnubansal51" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a> 
          </div>
        </div>
      </div>
      <div className="footer-bottom">
      <img src={logo} alt="PecCollegeSpace Logo" className="footer-logo" /> 
        {/* <p>Copyright &copy; PecCollegeSpace</p> */}
        <p>Copyright &copy; PecCampusFusion</p>
        <nav className="footer-nav">
          <Link to="/">Home</Link>
         

          
          <Link  to="/about">About us</Link> 
          <Link to="/materials">Material</Link>
          <Link to="/upload">Upload Material</Link>
       
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
