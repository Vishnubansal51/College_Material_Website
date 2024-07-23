

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Materials.css";

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [subject, setSubject] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 9;

  // Added state to store options
  const [options, setOptions] = useState({
    subjects: [],
    branches: [],
    semesters: [],
  });

  const fetchMaterials = async (query = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/material?${query}`
      );
     

      setMaterials(response.data.materials || []);
     
      setTotalCount(response.data.totalCount);
    } catch (error) {
    
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOptions = async () => {
    // Function to fetch unique options
    try {
      const response = await axios.get(
        "http://localhost:3000/material/options"
      );

      setOptions(response.data); // Set the options in the state
    } catch (error) {
      
    }
  };



  useEffect(() => {
    fetchOptions(); // Fetch options when the component mounts
    const query = new URLSearchParams({
      branch,
      semester,
      subject,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
    }).toString();
    fetchMaterials(query);
  }, [branch, semester, subject,currentPage]); 

  const handleFilter = () => {
    setCurrentPage(1);
    const query = new URLSearchParams({
      branch,
      semester,
      subject,
      limit: itemsPerPage,
      offset: 0,
    }).toString();
    fetchMaterials(query);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const query = new URLSearchParams({
      branch,
      semester,
      subject,
      limit: itemsPerPage,
      offset: (newPage - 1) * itemsPerPage,
    }).toString();
    fetchMaterials(query);
    scrollToTop(); // Scroll to top when page changes
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isImageFile = (fileUrl) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(fileUrl); // Function to check if the file is an image
  };



  const closePreview = () => {
    const previewPopup = document.getElementById("preview-popup");
    if (previewPopup) {
      previewPopup.style.display = "none";
    }
  };



  return (
    <div className="materials-page">
      <h1 className="header-title">Find Your Study Material Here</h1>

      <div className="filter-container">
        <div className="filter-item">
          <label>Subject:</label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">Select subject</option>
            {options.subjects.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Branch:</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">Select branch</option>
            {options.branches.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Semester:</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">Select semester</option>
            {options.semesters.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleFilter} className="filter-button">
          Filter
        </button>
      </div>
      <div className="materials-list">
       
        {loading ? (
          <p>Loading materials...</p>
        ) : materials.length > 0 ? (
          materials.map((material) => (
            <div key={material.id} className="material-item  my-1">
              <h2>{material.title}</h2>
              <p>Subject: {material.subject}</p>
              <p>Branch: {material.branch}</p>
              <p>Semester: {material.semester}</p>
              {material.description && material.description.length > 0 && (
                <p>Description: {material.description}</p>
              )}
              
              {material.files.map((file, index) => (
                <div  key={index}>
                  <a href={file.fileUrl} download>
                    Download File
                  </a>
                  

                  <span
                    className="preview-link"
                    onMouseOver={(e) => {
                      const previewPopup =
                        document.getElementById("preview-popup");
                      const previewLink = e.target.getBoundingClientRect();
                      
                      if (previewPopup) {
                        previewPopup.style.top = `${
                          previewLink.bottom + window.scrollY
                        }px`;
                        previewPopup.style.left = `${
                          previewLink.left + window.scrollX
                        }px`;
                        previewPopup.style.display = "block";
                        const img = document.getElementById("preview-img");
                        const iframe =
                          document.getElementById("preview-iframe");
                        const message =
                          document.getElementById("preview-message");

                        if (isImageFile(file.fileUrl)) {
                          if (img) {
                            img.src = file.fileUrl;
                            img.style.display = "block";
                          }
                          if (iframe) {
                            iframe.style.display = "none";
                          }
                          if (message) {
                            message.style.display = "none";
                          }
                        }
                        
                        else {
                          if (img) {
                            img.style.display = "none";
                          }
                          if (iframe) {
                            iframe.style.display = "none";
                          }
                          if (message) {
                            message.style.display = "block";
                            message.innerHTML =
                              "Preview not available. Please download the file to view.";
                          }
                          previewPopup.style.height = "140px";
                        }
                      }
                    }}
                    onMouseOut={() => {
                      if(!isImageFile(file.fileUrl)){

                        const previewPopup = document.getElementById("preview-popup");
                        if (previewPopup) {
                         
                          previewPopup.style.display = "none";
                        }
                        previewPopup.style.height = "400px";
                      }
                      
                    }}
                   
                  >
                    Preview
                  </span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No materials found</p>
        )}
      </div>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(totalCount / itemsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              className={`page-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      <div id="preview-popup" className="preview-popup">
        <button className="close-button" onClick={closePreview}>
          X
        </button>
        <img id="preview-img" src="" alt="Preview" />
        <iframe
          id="preview-iframe"
          title="Preview"
          style={{ display: "none" }}
        />
        <div
          id="preview-message"
          className="preview-message"
          style={{ display: "none" }}
        >
          Preview not available. Please download the file to view.
        </div>
      </div>
    </div>
  );
};

export default Materials;

