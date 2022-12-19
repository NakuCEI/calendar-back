const jwt = require('jsonwebtoken');

const JWTGenerator = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(
            payload, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: '3h' }, 
            (error, token) => {
                if (error) {
                    console.log('Error al generar el token: ', error);
                    reject('Error al generar el token');
                }
                resolve(token);
            }
        );
    });
};

module.exports = {
    JWTGenerator
};
