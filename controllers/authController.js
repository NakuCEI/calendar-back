const bcrypt = require('bcryptjs');
const { JWTGenerator } = require('../helpers/jwt');
const User = require('../models/UserModel');

// CREATE USER
const createUser = async (req, res) => {
    console.log('req.body: ', req.body);

    const { email, password } = req.body;

    try {
        // VALIDAR QUE EL USUARIO NO EXISTE
        let usuario = await User.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false, 
                msg: 'El usuario ya existe.'
            });
        };

        usuario = new User(req.body);

        // ENCRIPTAR LA CONTRASEÑA
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        console.log('usuario.password: ', usuario.password);

        // SUBIR USUARIO A BBDD 
        await usuario.save();

        // CREAR TOKEN
        const token = await JWTGenerator(usuario.id, usuario.name);
        
        // DEVOLVER RESPUESTA
        return res.status(201).json({
            ok: true, 
            msg: 'registrando', 
            token 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Contacta con el administrador.'
        });
    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    console.log('req.body: ', req.body);

    const { email, password } = req.body;

    try {
        // VALIDAR QUE EL USUARIO SÍ QUE EXISTE
        let usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false, 
                msg: 'El usuario no existe.'
            });
        };

        // COMPROBAR CONTRASEÑA
        const passwordOK = bcrypt.compareSync(password, usuario.password);

        if (!passwordOK) {
            return res.status(400).json({
                ok: false, 
                msg: 'La contraseña no es válida.'
            });
        };

        // GENERAR JWT
        const token = await JWTGenerator(usuario.id, usuario.name);

        const user = {
            name: usuario.name, 
            email: usuario.email, 
            uid: usuario._id
        };
        
        // DEVOLVER RESPUESTA
        return res.status(200).json({
            ok: true, 
            msg: 'Login correcto.', 
            user, 
            token 
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Contacta con el administrador.'
        });
    };
};

// RENEW TOKEN
const renewToken = async (req, res) => {
    console.log('req: ', req);

    const { uid, name } = req;

    // GENERAR JWT
    const token = await JWTGenerator(uid, name);
    console.log('token: ', token);
        
    // DEVOLVER RESPUESTA
    return res.status(200).json({
        ok: true, 
        msg: 'Renew token.', 
        token 
    });
};

module.exports = {
    createUser, 
    loginUser, 
    renewToken 
};
