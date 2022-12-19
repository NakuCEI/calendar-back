/* CARGAR EXPRESS */
const express=require('express');
const { DBConnection } = require('./database/config');
const cors = require('cors');
/* CONFIGURAR DOTENV */
require('dotenv').config();


/* CONFIGURAR EXPRESS */
const app=express();
const port=process.env.PORT || 3000;

/* CONECTAR BBDD */
DBConnection();

/* CORS */
// https://enable-cors.org/
app.use(cors());

/* CONFIGURAR STATIC */
app.use(express.static(__dirname + '/public'));

/* PARSEAR JSON */
app.use(express.json());

/* RUTAS */
app.use('/api/auth', require('./routes/authRoutes'));
// TODO calendarRoutes

/* PONER EXPRESS A LA ESCUCHA */
app.listen(port,()=>{
    console.log(`Express a la escucha del puerto ${port}`);
});