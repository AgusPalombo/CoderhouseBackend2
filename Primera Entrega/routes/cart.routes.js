const express = require('express');
const passport = require('passport');
const CartController = require('../controllers/cartController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware'); 
const authorizeUser = require('../middlewares/authorizeUser');

const router = express.Router();

// Ruta para obtener los carritos del usuario
router.get('/', ensureAuthenticated, CartController.getCarts);

// Ruta para finalizar la compra
router.post('/:cid/purchase', ensureAuthenticated, authorizeUser, CartController.purchaseCart);
router.post('/cart', ensureAuthenticated, authorizeUser, CartController.addToCart);

module.exports = router;

//actualizar