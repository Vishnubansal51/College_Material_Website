import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container ">
  
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At CampusFusion, our mission is to provide top-quality educational resources that empower
            students and educators to achieve their full potential. We strive to make learning
            accessible, engaging, and effective for everyone.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            We envision a world where knowledge is freely accessible to all, breaking down
            barriers to education and fostering a community of lifelong learners. Our platform
            is designed to support this vision by offering a wide range of materials and
            tools that cater to diverse learning needs.
          </p>
        </section>
        <section className="about-section">
          <h2>What We Do</h2>
          <p>
            We offer a comprehensive library of study materials, including textbooks, lecture
            notes, and multimedia resources. Our platform also features interactive tools for
            collaboration and communication, helping students and educators connect and share
            knowledge.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            Our team is composed of dedicated professionals with a passion for education and
            technology. We are committed to continuous innovation and improvement, ensuring
            that our platform meets the evolving needs of our users.
          </p>
        </section>
        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions, feedback, or suggestions, please don't hesitate to get
            in touch with us. You can reach us at <a href="mailto:bansalvishnu51@gmail.com">bansalvishnu51@gmail.com</a>.
            We look forward to hearing from you!
          </p>
        </section>
      </div>
   
    </div>
   
  );
};

export default About;
