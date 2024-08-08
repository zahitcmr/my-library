const authenticateUser = (req, res, next) => {
    const user = req.auth;
    if (user && user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
};

module.exports = authenticateUser;