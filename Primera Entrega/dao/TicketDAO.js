const Ticket = require('../models/Ticket'); 

// Clase TicketDAO: Encargada de la interacción con la base de datos
class TicketDAO {
    // Método para crear un nuevo Ticket
    async create(ticketData) {
        try {
            return await Ticket.create(ticketData); 
        } catch (error) {
            throw new Error(`Error al crear el Ticket: ${error.message}`);
        }
    }
}


module.exports = new TicketDAO();
