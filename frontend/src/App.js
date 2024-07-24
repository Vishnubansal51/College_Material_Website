import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Materials from './components/Materials';


import UploadMaterial from './components/UploadMaterial';
import ProtectedRoute from './context/ProtectedRoute';
import { AuthProvider } from './context/Authcontext';
import Footer from './components/Footer';



const App = () => {
  return (
    <AuthProvider>
      <Router>

        <Navbar   />
       

        <Routes>
          <Route path="/" element={<Home />} />
        
          <Route path="/about" element={<About />} />
          <Route path="/materials" element={<Materials />} />
  
          <Route path="/upload" element={<UploadMaterial />} />

          <Route path="/upload" element={<ProtectedRoute><UploadMaterial /></ProtectedRoute>} />
        </Routes>
        <Footer/>
       
      </Router>
    </AuthProvider>
  );
};

export default App;


