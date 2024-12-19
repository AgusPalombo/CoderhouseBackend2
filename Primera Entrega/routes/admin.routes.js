const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole'); 

// Rutas para administrar productos
router.get('/users', ensureAuthenticated, ensureAuthenticated, authorizeRole('admin'), authController.getAllUsers);
router.get('/products', ensureAuthenticated, productController.getAllProducts);
router.post('/products', ensureAuthenticated, authorizeRole('admin'), productController.createProduct);
router.put('/products/:id', ensureAuthenticated, authorizeRole('admin'), productController.updateProduct);
router.delete('/products/:id', ensureAuthenticated, authorizeRole('admin'), productController.deleteProduct);

module.exports = router;
