const Cart = require('../models/Cart');

// Métodos adicionales para trabajar con el carrito
class CartDAO {
    // Obtener un carrito por ID
    async getById(id) {
        return await Cart.findById(id).populate('items.productId');
    }

    async create(cartData) {
        const cart = new Cart(cartData);
        return await cart.save();
    }

    // Obtener un carrito por el ID del usuario
    async getByUserId(userId) {
        return await Cart.findOne({ user: userId });
    }

    // Limpiar el carrito después de una compra
    async clearCart(id) {
        return await Cart.findByIdAndUpdate(id, { items: [] }, { new: true });
    }
}

module.exports = new CartDAO();
