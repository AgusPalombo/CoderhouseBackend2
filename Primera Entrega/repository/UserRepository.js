const UserDAO = require('../dao/UserDAO');
const UserDTO = require('../dto/UserDTO'); 

class UserRepository {
    // Obtener un usuario por ID y transformarlo en un DTO
    async getUserById(id) {
        const user = await UserDAO.getById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return new UserDTO(user); 
    }
}

module.exports = new UserRepository();
