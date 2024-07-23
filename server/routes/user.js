const express = require('express');

const userController = require('../controllers/userController')

const router = express.Router();

router.post('/sign-up',userController.signup)
router.post('/login',userController.login)
router.delete('/:email', userController.deleteUserByEmail);

module.exports = router;