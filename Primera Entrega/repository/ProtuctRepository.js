const ProductDAO = require('../dao/ProductDAO');
const ProductDTO = require('../dto/ProductDTO'); 

class ProductRepository {
     // Método para obtener todos los productos
     async getAll() {
        try {
            const products = await ProductDAO.getAll(); 
            return products.map(product => new ProductDTO(product)); 
        } catch (error) {
            throw new Error('Error al obtener los productos');
        }
    }
    
    // Crear un producto
    async create(productData) {
        const product = await ProductDAO.create(productData);
        return new ProductDTO(product);
    }

    // Obtener un producto por ID
    async getById(id) {
        const product = await ProductDAO.getById(id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return new ProductDTO(product);
    }

    // Actualizar un producto
    async updateById(id, updateData) {
        const product = await ProductDAO.updateById(id, updateData);
        return new ProductDTO(product);
    }

   // Método para eliminar un producto por ID
   async deleteById(id) {
    const deletedProduct = await ProductDAO.deleteById(id);
    if (!deletedProduct) {
        throw new Error('Producto no encontrado');
    }
    return deletedProduct;
}
}

module.exports = new ProductRepository();
