const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/register', adminController.registerUser);

router.post('/login', adminController.login);

router.post('/logout', adminController.logout);

module.exports = router;