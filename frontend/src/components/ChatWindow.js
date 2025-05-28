// frontend/src/components/ChatWindow.js

import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

const ChatWindow = ({ messages }) => {
  return (
    <ListGroup variant="flush" style={{ height: '400px', overflowY: 'scroll' }}>
      {messages.map((msg, index) => (
        <ListGroup.Item
          key={index}
          className={msg.sender === 'user' ? 'text-end' : 'text-start'}
        >
          <Badge bg={msg.sender === 'user' ? 'primary' : 'success'}>
            {msg.sender}
          </Badge>
          <div>{msg.content}</div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ChatWindow;
