
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Login from './Login';
import Signup from './Signup';
const Sidebar = ({ isOpen, closeSidebar, children }) => {
  const [formType, setFormType] = useState(children.props.formType);

  useEffect(() => {
    setFormType(children.props.formType);
  }, [children.props.formType]);

  const toggleFormType = (type) => {
    setFormType(type);
  };

  let formComponent;
  if (formType === 'Login') {
    formComponent = <Login formType={formType} closeSidebar={closeSidebar} />;
  } else if (formType === 'Sign Up') {
    formComponent = <Signup formType={formType} closeSidebar={closeSidebar} />;
  }


  return (
    <div className={`sidebar ${isOpen? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>{formType}</h2>
        <span className="sidebar-close" onClick={closeSidebar}>&times;</span>
      </div>
      <div className="sidebar-content">
        {formComponent}
      </div>
      <div className="sidebar-footer">
        {formType === 'Login'? (
          <p>
            Don't have an account? <span className="link" onClick={() => toggleFormType('Sign Up')}>Sign up</span>
          </p>
        ) : (
          <p>
            Already have a CampusFusion account? <span className="link" onClick={() => toggleFormType('Login')}>Log in</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;