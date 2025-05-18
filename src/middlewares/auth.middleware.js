export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Acceso denegado. Solo administradores.' });
    }
};

export const isUser = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ error: 'Usuario no autenticado' });
    }
};