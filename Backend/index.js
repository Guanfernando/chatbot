// chatbot/backend/index.js

// creaciom del servidor
import express from  'express';
import cors from 'cors';

import dotenv from 'dotenv';

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get ('/', (req,res,next) => {

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
