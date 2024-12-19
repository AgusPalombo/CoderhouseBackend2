// Middleware para autorizar roles específicos
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Acceso no autorizado' });
        }
        next();
    };
};

module.exports = authorizeRole;

