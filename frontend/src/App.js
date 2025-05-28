import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/messages')
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSendMessage = async (messageText) => {
    try {
      const res = await axios.post('http://localhost:3001/api/messages', {
        content: messageText
      });
      const { user, bot } = res.data;
      setMessages(prev => [...prev, { content: user, sender: 'user' }, { content: bot, sender: 'bot' }]);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>Chatbot</Card.Header>
        <Card.Body>
          <ChatWindow messages={messages} />
          <MessageInput onSend={handleSendMessage} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default App;
