const { verify } = require('jsonwebtoken');

const tokenValidator = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) return res.status(401).json({
        ok: false,
        msg: 'No se recibió un token de autenticación'
    });

    try {
        const { username } = verify(token, process.env.SECRET_TOKEN_KEY);
        req.body = { username };
        next();
    } catch(error) {
        return res.status(401).json({
            ok: false,
            msg: 'El token recibido es inválido'
        });
    }
}

module.exports = {
    tokenValidator
}