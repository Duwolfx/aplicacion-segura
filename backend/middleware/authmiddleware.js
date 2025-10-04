const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    console.log('Verificando token de autenticación...');
    const token = req.cookies.token;
    if (!token) {
        console.log('No se proporcionó token.');
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
    }
    try {
        console.log('Token recibido:', token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Añade el payload del token a la solicitud
        next();
    } catch (error) {
        console.log('Error al verificar token:', error);
        res.status(400).json({ error: 'Token inválido.' });
    }
};
module.exports = { verifyToken };