

import React, { useState,useRef } from 'react';
import axios from 'axios';
import { Container, Form, Button, Col, Row, Alert } from 'react-bootstrap';
import './UploadMaterial.css'

const UploadMaterial = () => {
  const [subject, setSubject] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });


  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const maxFiles = 10;

    if (selectedFiles.length > maxFiles) {
      setAlert({
        show: true,
        message: 'You can upload a maximum of 10 files.',
        variant: 'danger',
      });

      setTimeout(() => {
    
        setAlert({ show: false, message: '', variant: '' });
      }, 3000);
      setFiles([]);
    } else {
      setFiles(selectedFiles);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('branch', branch);
    formData.append('semester', semester);
    formData.append('title', title);
    formData.append('description', description);

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response =  await axios.post('http://localhost:3000/material/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    
      setAlert({ show: true, message: response.data.message, variant: 'success' });
      setSubject("")
      setBranch("")
      setSemester("")
      setTitle("")
      setDescription("")
      setFiles([]);
    
      if (fileInputRef.current) {
        fileInputRef.current.value = null;  // Clear the file input field
      }
      // Automatically hide the alert after 10 seconds
      setTimeout(() => {
    
        setAlert({ show: false, message: '', variant: '' });
      }, 3000);
    } catch (error) {
     

      if (error.response && error.response.status === 500) {
        setAlert({ show: true, message: 'Internal server error', variant: 'danger' });
      } else {
        setAlert({ show: true, message: 'Please login to upload the material', variant: 'danger' });
      }
      
      setTimeout(() => {
        setAlert({ show: false, message: '', variant: '' });
      }, 3000);


      
    }
  };

  return (
    <Container className="mt-5 upload-container">
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      
      <h2 className="upload-heading">Upload Study Material</h2>
      <Form onSubmit={handleUpload}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formSubject">
             <Form.Label>
              Subject <span className="required">*</span> 
            </Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formBranch">
          <Form.Label>
              Branch <span className="required">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formSemester">
          <Form.Label>
              Semester <span className="required">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              min={0}
              max={8}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formTitle">
          <Form.Label>
              Title <span className="required">*</span> 
            </Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFiles">
        <Form.Label>
            Files <span className="required">*</span>
          </Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} ref={fileInputRef} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Upload
        </Button>
      </Form>
    </Container>
  );
};

export default UploadMaterial;
