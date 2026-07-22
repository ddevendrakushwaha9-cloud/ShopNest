const express = require("express");
const {protect} = require('../middleware/authMiddleware');
const {admin} = require('../middleware/adminMiddleware');
const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/productController');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


const router = express.Router();

// All product
//short me dono routes get or post ko likha hai
router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct);
//specific product CRUD operation
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;