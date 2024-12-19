const mongoose = require('mongoose'); 
const { v4: uuidv4 } = require('uuid'); 

// Definimos el esquema para el modelo Ticket
const ticketSchema = new mongoose.Schema({
    code: { 
        type: String, 
        required: true, 
        unique: true, 
        default: uuidv4 
    },
    purchase_datetime: { 
        type: Date, 
        default: Date.now 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    purchaser: { 
        type: String, 
        required: true 
    }
});

// Exportamos el modelo Ticket
module.exports = mongoose.model('Ticket', ticketSchema);
