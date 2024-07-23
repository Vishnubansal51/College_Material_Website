const AWS = require('aws-sdk');
const path = require('path');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
  
});

const s3 = new AWS.S3();

async function saveFileAsync(file) {


  
  const uploadDir = 'uploads'; // Directory prefix for S3
  const fileName = Date.now() + '-' + file.originalname;
  const filePath = path.join(uploadDir, fileName);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filePath,
    Body: file.buffer,
    // ACL: 'public-read' // Optional: to make the file publicly accessible
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; // Return the file URL
  } catch (error) {
    throw new Error(`Error uploading file to S3: ${error.message}`);
  }
}

module.exports = { saveFileAsync };
