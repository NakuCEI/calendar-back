const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    const token = req.header('x-token');
    console.log({token});

    if (!token) {
        return res.status(401).json({
            ok: false, 
            msg: 'No hay token en la petición.'
        });
    }

    try {

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.uid = payload.uid;
        req.name = payload.name;
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false, 
            msg: 'Token no válido.'
        });
    }

    next();
};

module.exports = {
    validateJWT 
};
