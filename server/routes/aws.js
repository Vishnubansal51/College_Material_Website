
// const AWS = require('aws-sdk');

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });




// app.get('/generate-presigned-url', async (req, res) => {
//   const path = req.query.path;
//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: path,
//     Expires: 60, // 1 minute
//   };
//   try {
//     const uploadURL = await s3.getSignedUrlPromise('getObject', params);
//     res.json({ uploadURL });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to generate presigned URL' });
//   }
// });