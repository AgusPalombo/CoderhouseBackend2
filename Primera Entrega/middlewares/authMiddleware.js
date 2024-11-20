exports.ensureAuthenticated = (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: 'Not authenticated' });
    next();
};
