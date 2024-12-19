const ProductRepository = require('../repository/ProtuctRepository');

// Controlador para obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductRepository.getAll(); 
        res.status(200).json({ products }); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};


// Controlador para crear un producto
exports.createProduct = async (req, res) => {
    try {
        const { name, price, stock, description } = req.body;
        const newProduct = await ProductRepository.create({
            name,
            price,
            stock,
            description,
        });
        res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

// Controlador para actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, stock, description } = req.body;
        const updatedProduct = await ProductRepository.updateById(req.params.id, {
            name,
            price,
            stock,
            description,
        });
        res.status(200).json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

// Controlador para eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await ProductRepository.deleteById(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado exitosamente', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};
