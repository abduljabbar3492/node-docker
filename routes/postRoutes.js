const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const protect = require('../middlewares/authMiddleware');
router.route('/create').post(protect,postController.insertPost).get(protect,postController.getPost);

module.exports = router;