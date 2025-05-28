import axios from 'axios';
import { connection } from '../models/db.js';

export const getMessages = (req, res) => {
  connection.query('SELECT * FROM messages ORDER BY created_at ASC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los mensajes' });
    res.json(results);
  });
};

export const createMessage = async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: 'El mensaje está vacío' });

  // guardar mensaje del usuario
  connection.query(
    'INSERT INTO messages (content, sender) VALUES (?, ?)',
    [content, 'user'],
    async (err) => {
      if (err) return res.status(500).json({ error: 'Error al guardar el mensaje del usuario' });

      try {
        // enviar mensaje al endpoint de IA
        const response = await axios.post(
          'http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/getOpenaiResponse',
          { input: content }
        );

        const botReply = response.data.choices[0].message.content;

        // guardar respuesta del bot
        connection.query(
          'INSERT INTO messages (content, sender) VALUES (?, ?)',
          [botReply, 'bot'],
          (err) => {
            if (err) return res.status(500).json({ error: 'Error al guardar respuesta del bot' });

            // enviar ambos mensajes al frontend
            res.json({ user: content, bot: botReply });
          }
        );
      } catch (error) {
        console.error('Error al llamar a la IA:', error);
        res.status(500).json({ error: 'Error al obtener respuesta de la IA' });
      }
    }
  );
};
