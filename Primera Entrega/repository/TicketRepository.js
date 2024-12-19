const TicketDAO = require('../dao/TicketDAO');
const TicketDTO = require('../dto/TicketDTO');

class TicketRepository {
    // Crear un ticket
    async createTicket(ticketData) {
        const ticket = await TicketDAO.create(ticketData);
        return new TicketDTO(ticket);
    }
}

module.exports = new TicketRepository();
