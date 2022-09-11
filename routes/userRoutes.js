const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.route('/create').post(userController.insertUser).get(userController.getUser);
router.post('/login', userController.login);
module.exports = router;