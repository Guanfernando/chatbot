// backend/models/db.js

import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Crear conexión
const connectdb = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Conectar y manejar errores
connectdb.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
        return;
    }
    console.log('Conexión exitosa con MySQL');
});

export default connectdb;