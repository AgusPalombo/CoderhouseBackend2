const Product = require('../models/Product');
const ProductDTO = require('../dto/ProductDTO');

class ProductDAO {
    // Método para obtener todos los productos
    async getAll() {
        try {
            const products = await Product.find(); 
            return products.map(product => new ProductDTO(product));
        } catch (error) {
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }

    // Método para crear un nuevo producto
    async create(productData) {
        try {
            const product = new Product(productData);
            return await product.save();
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    async updateById(productId, updateData) {
        try {
            // Buscar el producto por ID
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
    
            // Actualizar los campos del producto con los datos proporcionados
            Object.keys(updateData).forEach(key => {
                product[key] = updateData[key];
            });
    
            // Guardar los cambios en el producto
            return await product.save();
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }

    async deleteById(productId) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId); 
            return deletedProduct;
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }

     // Método para obtener un producto por ID
     async getById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener el producto: ${error.message}`);
        }
    }

    // Método para obtener múltiples productos por sus IDs
    async getByIds(ids) {
        try {
            return await Product.find({ _id: { $in: ids } });
        } catch (error) {
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }

    // // Método para actualizar un producto
    // async updateStock(productId, quantity) {
    //     try {
    //         const product = await Product.findById(productId);
    //         if (product) {
    //             product.stock -= quantity; // Reducir el stock
    //             return await product.save();
    //         }
    //         throw new Error('Producto no encontrado');
    //     } catch (error) {
    //         throw new Error(`Error al actualizar el stock: ${error.message}`);
    //     }
    // }
}

module.exports = new ProductDAO();
