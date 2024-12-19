// Middleware para autorizar solo a usuarios con rol 'user'
const authorizeUser = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'Acceso no autorizado. Solo los usuarios pueden realizar esta acción.' });
    }
    next();
};

module.exports = authorizeUser;
