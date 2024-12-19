const User = require('../models/User');

// Clase UserDAO: Encargada de la interacción con la base de datos
class UserDAO {
    // Método para obtener todos los usuarios
    async getAll() {
        try {
            return await User.find({}, '_id first_name last_name email role'); // Incluye solo los campos necesarios
        } catch (error) {
            throw new Error(`Error al obtener los usuarios: ${error.message}`);
        }
    }

    // Obtener un usuario por ID
    async getById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            throw new Error(`Error al obtener el usuario: ${error.message}`);
        }
    }

    // Crear un nuevo usuario
    async create(userData) {
        try {
            return await User.create(userData); 
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    }

    // Actualizar un usuario por ID
    async updateById(id, updateData) {
        try {
            return await User.findByIdAndUpdate(id, updateData, { new: true }); 
        } catch (error) {
            throw new Error(`Error al actualizar el usuario: ${error.message}`);
        }
    }

    // Eliminar un usuario por ID
    async deleteById(id) {
        try {
            return await User.findByIdAndDelete(id); 
        } catch (error) {
            throw new Error(`Error al eliminar el usuario: ${error.message}`);
        }
    }
}


module.exports = new UserDAO();
