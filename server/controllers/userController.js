// Import required packages and models
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Import your User model from Sequelize
const sendMail = require('../helper/sendMail');
const cron = require('node-cron');
// Signup function
exports.signup = async (req, res) => {
  console.log("body", req.body)
  console.log("name",req.name,req.email, req.password);
  const transaction = await User.sequelize.transaction();
  try {
    // Extract user input from request body
    const { email, password,name } = req.body;
    

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Email is already registered' });
    }

    
    
    
    // Create a new user in the database
    const newUser = await User.create({ email, password_hash: password,name : name}, { transaction });
    await newUser.validate();
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password_hash= hashedPassword;
    // Generate a JWT token
    // console.log("token", process.env.Secret_token)
    const token = jwt.sign({ userId: newUser.id, email: newUser.email },process.env.Secret_token, { expiresIn: '1d' });

    newUser.verification_token = token;process.env.Secret_token
    // await newUser.save();
    // console.log(newUser.verification_token  ,"token")
   
    
    // Sending mail content
    let mailSubject='Mail Verification';
    // let content = '<p>Hii '+ req.body.name +', \ Please <a href = "http://127.0.0.1:3000/mail-verification?token='+token+'">Verify </a> your Mail!';

    // let content = '<p>Hii ' + req.body.name + ', Please <a href="http://127.0.0.1:3000/mail-verification?token=' + token + '">Verify</a> your Mail!</p>';

    // sendMail(req.body.email,mailSubject,content);
    const mailSent = await sendMail(email, mailSubject, token);
    // console.log("vs",mailSent)
    // if (!mailSent) {
    //   await transaction.rollback();
    //   return res.status(500).json({ message: 'Failed to send verification email' });
    // }

    // Save the user and commit the transaction
    await newUser.save({ transaction });
    await transaction.commit();
    // Return success response with JWT token
 res.status(201).json({ message: 'Signup successful! Check your email for verification. ', token });
  } catch (error) {
    await transaction.rollback();

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors.map(e => e.message) });
    }
    // console.error('Error in signup:', error);
   res.status(500).json({ message: 'Internal server error' });
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    // Extract user input from request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    let isVerified = user.verified;

    if(!isVerified){
      return res.status(401).json({ message: 'Your account is not verified Please check your mail for the verification' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.Secret_token, { expiresIn: '1d' });

    // Return success response with JWT token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    // console.error('Error in login:', error);
    res.status(500).json({ message: 'Internal server error' });

  }
};


// Method to delete a user by email
exports.deleteUserByEmail = async (req, res) => {
  try {
    // Extract email from request parameters
    const { email } = req.params;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
   
    // If user not found, return 404 status
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await user.destroy();

    // Return success response
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




exports.verifyEmail = async (req, res) => {
  try {
    // Extract token from request query
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: 'No token provided.' });
    }

    // Verify token
    let decodedToken;
    // try {
    //   decodedToken = jwt.verify(token, 'vishnu');
    // } catch (err) {
    //   return res.status(400).json({ message: 'Invalid or expired token.' });
    // }

    try {
      decodedToken = jwt.verify(token, process.env.Secret_token);
    } catch (err) {
      return res.render('mail-verification', { message: 'Invalid or expired token.' });
    }
    // Find user by email
    const user = await User.findOne({ where: { email: decodedToken.email } });

    // if (!user) {
    //   return res.status(404).json({ message: 'User not found.' });
    // }
    if (!user) {
      return res.render('mail-verification', { message: 'User not found.' });
    }

    // Check if the token has already been used
    // if (!user.verification_token) {
    //   return res.status(400).json({ message: 'Token has already been used or expired.' });
    // }
    if (!user.verification_token) {
      return res.render('mail-verification', { message: 'Token has already been used or expired.' });
    }


    // Mark user as verified and clear the verification token
    await user.update({ verified: true, verification_token: null, role:"Uploader"  });
    

    return res.render('mail-verification', { message: 'Email verified successfully' });
  } catch (error) {
    // console.error('Error verifying email:', error);
    // return res.status(500).json({ message: 'Internal server error' });

    return res.render('mail-verification', { message: 'Internal server error' })
  }
};




// const deleteUnverifiedUsers = async () => {
//   try {
//     const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // Calculate the date one day ago

//     // Delete users who are not verified and were created more than one day ago
//     const result = await User.destroy({
//       where: {
//         verified: false,
//         createdAt: {
//           [Op.lt]: oneDayAgo
//         }
//       }
//     });

//     // console.log(`Deleted ${result} unverified users`);
//   } catch (error) {
//     // console.error('Error deleting unverified users:', error);
//   }
// };

// // Schedule the job to run every day at midnight
// cron.schedule('0 0 * * *', () => {
//   // console.log('Running daily job to delete unverified users');
//   deleteUnverifiedUsers();
// });
