const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/register', adminController.registerUser);

router.post('/login', adminController.login);

router.post('/logout', adminController.logout);

router.post('/addFavorite', isAuth, adminController.addFavorite);

module.exports = router;