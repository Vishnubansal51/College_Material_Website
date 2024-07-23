const { StudyMaterial,File } = require('../models');
const { saveFileAsync } = require('../utils/fileUtils');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Controller functions for managing study materials
exports.createMaterial = async (req, res) => {
  try {
    // Extract material data from request body
    const { subject, branch, semester, title, description } = req.body;
    const files = req.files;

    if ( !files || files.length === 0) {
      return res.status(400).json({ message: 'please provide the file' });
    }

    const uploader_id = req.user.userId;
    // const fileUrl = await saveFileAsync(req.file);
    // Create a new study material in the database
    const newMaterial = await StudyMaterial.create({ subject, branch, semester, title, description, uploader_id });
    // const filePromises = files.map(file => saveFileAsync(file).then(filePath => {
    //   return File.create({
    //     studyMaterialId: newMaterial.id,
    //     fileUrl: filePath
    //   });
    // }));
    const filePromises = files.map(file => 
      saveFileAsync(file).then(fileUrl => {
        return File.create({
          studyMaterialId: newMaterial.id,
          fileUrl: fileUrl
        });
      })
    );
    await Promise.all(filePromises);

    
    // Return success response with the newly created material
    res.status(201).json({ message: 'Study material created successfully', material: newMaterial });
  } catch (error) {

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors.map(e => e.message) });
    }
    // console.error('Error creating study material:', error);
    
    res.status(500).json({ message: 'Internal server error' });
  }
};

// exports.uploadFile = upload.single('file'); 
exports.uploadFile = upload.array('files', 10); // Allow up to 10 files




// include paging concept
exports.getMaterialByCriteria = async (req, res) => {
  try {
    const { branch, semester, subject, id, limit, offset } = req.query;
    // console.log("by branch ", branch);

    const whereClause = {};
    if (branch) {
      whereClause.branch = branch;
    }
    if (semester) {
      whereClause.semester = semester;
    }
    if (subject) {
      whereClause.subject = subject;
    }
    if (id) {
      whereClause.id = id;
    }

    const totalCount = await StudyMaterial.count({
      where: whereClause,
    });
    const materials = await StudyMaterial.findAll({
      where: whereClause,
      include: [
        {
          model: File,
          as: 'files',
          attributes: ['fileUrl']
        }
      ],
      // order: [['createdAt', 'DESC']],
      limit: limit ? parseInt(limit, 10) : 10, // default limit to 10 if not provided
      offset: offset ? parseInt(offset, 10) : 0,
    });
    // console.log('Total Count:', materials.count); 
    // console.log('Total rows:', materials.rows.length); 
    // if (materials.rows.length === 0) {
    //   return res.status(404).json({ message: 'Study materials not found' });
    // }
    if (materials.length === 0) {
      return res.status(404).json({ message: 'Study materials not found' });
    }
    // console.log( totalCount)
    // console.log( materials.length)

    res.status(200).json({ 
      // materials: materials.rows,
       materials: materials,
      
      totalCount: totalCount,
     
    });
  } catch (error) {
    // console.error('Error fetching study materials:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// EXPORTING ALL UNIQUE branch, subj, sem 
exports.getMaterialOptions = async (req, res) => {
  try {
    const materials = await StudyMaterial.findAll({
      attributes: ['subject', 'branch', 'semester'],
    });

    const uniqueSubjects = Array.from(new Set(materials.map(m => m.subject)));
    const uniqueBranches = Array.from(new Set(materials.map(m => m.branch)));
    const uniqueSemesters = Array.from(new Set(materials.map(m => m.semester)));

    res.status(200).json({
      subjects: uniqueSubjects,
      branches: uniqueBranches,
      semesters: uniqueSemesters,
    });
  } catch (error) {
    // console.error('Error fetching study material options:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, branch, semester, title, description } = req.body;

    // Find the study material by ID
    const material = await StudyMaterial.findByPk(id);

    // Check if material exists
    if (!material) {
      return res.status(404).json({ message: 'Study material not found' });
    }

    // Update the material with new data
    await material.update({ subject, branch, semester, title, description});

    // Return success response
    res.status(200).json({ message: 'Study material updated successfully' });
  } catch (error) {
    // console.error('Error updating study material:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("dlt",id);
    // Find the study material by ID
    const material = await StudyMaterial.findByPk(id);
    // console.log(material)
    // Check if material exists
    if (!material) {
      return res.status(404).json({ message: 'Study material not found' });
    }

    // Delete the material from the database
    await material.destroy();

    // Return success response
    res.status(200).json({ message: 'Study material deleted successfully' });
  } catch (error) {
    // console.error('Error deleting study material:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};