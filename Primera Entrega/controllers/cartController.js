const CartDAO = require('../dao/CartDAO');
const ProductDAO = require('../dao/ProductDAO');
const TicketDAO = require('../dao/TicketDAO');
const TicketDTO = require('../dto/TicketDTO');
const mongoose = require('mongoose');

class CartController {
    // Método para agregar un producto al carrito
    async addToCart(req, res) {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        try {
            // Buscar el carrito del usuario por su ID
            let cart = await CartDAO.getByUserId(userId);

            // Si no existe el carrito, creamos uno nuevo
            if (!cart) {
                cart = await CartDAO.create({ user: userId, items: [] });
            }

            // Verificar si el producto ya está en el carrito
            const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            const product = await ProductDAO.getById(productId); // Obtener el producto para verificar stock
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            // Validar si hay suficiente stock
            if (quantity > product.stock) {
                return res.status(400).json({ message: 'No hay stock suficiente para dicha cantidad' });
            }

            if (productIndex === -1) {
                // Si el producto no está en el carrito, lo agregamos
                cart.items.push({
                    productId: product._id,
                    quantity,
                    price: product.price
                });
            } else {
                // Si el producto ya está en el carrito, actualizamos la cantidad
                cart.items[productIndex].quantity += quantity;
            }

            // Guardar el carrito actualizado
            await cart.save();
            res.status(200).json({ message: 'Producto agregado al carrito', cart });
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar el producto al carrito', error: error.message });
        }
    }

    // Método para realizar la compra de un carrito
    async purchaseCart(req, res) {
        console.log(req.user); 
        const { cid } = req.params;  
        const userId = req.user._id.toString();  

        const session = await mongoose.startSession(); 

        try {
            session.startTransaction();  

            // Obtener el carrito del usuario
            const cart = await CartDAO.getById(cid);
            if (!cart || cart.user.toString() !== userId) {
                return res.status(404).json({ message: 'Carrito no encontrado o no pertenece al usuario' });
            }

            let unprocessedProducts = [];
            let totalAmount = 0;

            // Obtener todos los productos del carrito en una sola consulta
            const productIds = cart.items.map(item => item.productId);
            const products = await ProductDAO.getByIds(productIds);

            // Verificar stock y procesar los productos
            for (let item of cart.items) {
                const product = products.find(p => p._id.toString() === item.productId.toString());

                if (!product || product.stock < item.quantity) {
                    unprocessedProducts.push(item.productId); 
                } else {
                    // Restar stock del producto
                    product.stock -= item.quantity;
                    await product.save({ session }); 
                    totalAmount += product.price * item.quantity;
                }
            }

            // Si hay productos que no se pudieron procesar, devolverlos
            if (unprocessedProducts.length > 0) {
                return res.status(400).json({
                    message: 'Algunos productos no tienen suficiente stock',
                    unprocessedProducts
                });
            }

            // Crear un ticket con la información de la compra
            const ticketData = {
                amount: totalAmount,
                purchaser: req.user.email
            };
            const ticket = await TicketDAO.create(ticketData, { session });

            // Limpiar el carrito
            await CartDAO.clearCart(cid);

            // Finalizar la transacción
            await session.commitTransaction();
            session.endSession();

            // Enviar el ticket al usuario
            const ticketDTO = new TicketDTO(ticket);
            res.json({
                message: 'Compra realizada exitosamente',
                ticket: ticketDTO,
                unprocessedProducts
            });

        } catch (error) {
            await session.abortTransaction();  // Revertir la transacción en caso de error
            session.endSession();
            res.status(500).json({ message: 'Error al procesar la compra', error: error.message });
        }
    }

    // Método para obtener los carritos del usuario
    async getCarts(req, res) {
        const userId = req.user._id;

        try {
            const carts = await CartDAO.getByUserId(userId);
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los carritos', error: error.message });
        }
    }
    
}

module.exports = new CartController();
