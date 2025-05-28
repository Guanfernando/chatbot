// chatbot/backend/index.js

// creaciom del servidor
import express from  'express';
import cors from 'cors';
import connectdb from './models/db.js';
import messagesRoutes from './routes/messages.routes.js';


import dotenv from 'dotenv';
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', messagesRoutes);

console.log('Usuario:', process.env.DB_USER);
console.log('Contraseña:', process.env.DB_PASSWORD);
console.log('Base de datos:', process.env.DB_NAME);

const PORT = process.env.PORT || 3000;

app.get ('/', (req,res,next) => {
    console.log('variable de entorno: ', process.env);

    // implementacion de try - catch para manejo de errores
    try {
        res.send(`Servidor en ejecucion en el puerto ${PORT}`);
    } catch (error) {
        next(error);
        console.log('Error al intentar conectar con el servidor', error.message)
        res.status(500).json({error: 'Error al intentar conectar con el servidor'});
    }
});

app.listen(PORT, () =>{
    console.log(`Servidor escuchado en en https://localhost:${PORT}`);
});
