import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5600'); // Adjust based on your server URL

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState(''); 

    useEffect(() => {
        socket.on('receiveMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = { username, text: message }; 
            socket.emit('sendMessage', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage('');
        }
    };

    const handleMessageChange = (e) => setMessage(e.target.value);

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.username}: </strong>{msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Name"
            />
            <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
