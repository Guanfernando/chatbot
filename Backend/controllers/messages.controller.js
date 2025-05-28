import connectdb from '../models/db.js';

export const getMessages = (req, res) => {
    const query = 'SELECT * FROM messages';
    
    connectdb.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching messages:', error);
            return res.status(500).json({ error: 'Error retrieving messages' });
        }
        res.json(results);
    });
};

export const createMessage = (req, res) => {
    const { content, user_id } = req.body;
    
    if (!content) {
        return res.status(400).json({ error: 'Message content is required' });
    }

    const query = 'INSERT INTO messages (content, user_id) VALUES (?, ?)';
    const values = [content, user_id || null];

    connectdb.query(query, values, (error, results) => {
        if (error) {
            console.error('Error creating message:', error);
            return res.status(500).json({ error: 'Error creating message' });
        }
        res.status(201).json({ 
            message: 'Message created successfully',
            id: results.insertId 
        });
    });
};