// backend/controllers/messages.controllers.js

import axios from 'axios';
import connectdb from '../models/db.js';

// obtener todos los mensajes ordenados por fecha
export const getMessages = (req, res) => {
  connectdb.query('SELECT * FROM messages ORDER BY created_at ASC', (err, results) => {
    if (err) {
      console.error('Error al obtener los mensajes:', err);
      return res.status(500).json({ error: 'Error al obtener los mensajes' });
    }

    console.log('Mensajes obtenidos correctamente');
    res.json(results);
  });
};

// crear mensaje del usuario, obtener respuesta de la IA y guardar ambos
export const createMessage = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    console.warn('⚠️ El contenido del mensaje está vacío');
    return res.status(400).json({ error: 'El mensaje está vacío' });
  }

  // guardar mensaje del usuario en la base de datos
  connectdb.query(
    'INSERT INTO messages (content, sender) VALUES (?, ?)',
    [content, 'user'],
    async (err) => {
      if (err) {
        console.error('Error al guardar el mensaje del usuario:', err);
        return res.status(500).json({ error: 'Error al guardar el mensaje del usuario' });
      }

      console.log('Mensaje del usuario guardado:', content);

      try {
        // enviar el mensaje al endpoint externo de la IA
        const response = await axios.post(
          'http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/getOpenaiResponse',
          { input: content }
        );

        const botReply = response.data.choices[0].message.content;
        console.log('Respuesta de la IA recibida:', botReply);

        // guardar la respuesta de la IA (bot) en la base de datos
        connectdb.query(
          'INSERT INTO messages (content, sender) VALUES (?, ?)',
          [botReply, 'bot'],
          (err) => {
            if (err) {
              console.error('Error al guardar la respuesta del bot:', err);
              return res.status(500).json({ error: 'Error al guardar respuesta del bot' });
            }

            console.log('Respuesta del bot guardada');
            // devolver ambos mensajes al frontend
            res.json({ user: content, bot: botReply });
          }
        );
      } catch (error) {
        console.error('Error al llamar al servicio de IA:', error);
        res.status(500).json({ error: 'Error al obtener respuesta de la IA' });
      }
    }
  );
};
