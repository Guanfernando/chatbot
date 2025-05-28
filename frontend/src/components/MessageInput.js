// frontend/src/components/MessageInput.js 

import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <InputGroup className="mt-3">
      <FormControl
        placeholder="Escribe un mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <Button variant="primary" onClick={handleSend}>
        Enviar
      </Button>
    </InputGroup>
  );
};

export default MessageInput;
