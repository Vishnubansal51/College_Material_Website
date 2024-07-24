import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-logo">

        
        <i class="fa-solid fa-layer-group"></i>
     
        </div>
      
        <h1>Campus Fusion</h1>
      
        <p id="custom-paragraph" >Campus Fusion is your one-stop solution for all your academic needs. Our mission is to create a shared plan for enhancing the college experience for students.</p>
        
        <Link to="/about" className="btn btn-primary">Know More</Link>
      </div>
    </div>
  );
};

export default Home;
