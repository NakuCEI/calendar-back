const mongoose = require('mongoose');

const DBConnection = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DB_URI);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la base de datos');
    };
};

module.exports = {
    DBConnection
};
