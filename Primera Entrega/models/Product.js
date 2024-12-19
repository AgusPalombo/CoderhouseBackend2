const mongoose = require('mongoose');

// Definir el esquema para el modelo Product
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
}, { timestamps: true }); 


module.exports = mongoose.model('Product', productSchema);
