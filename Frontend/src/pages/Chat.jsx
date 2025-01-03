/*import React, { useEffect, useState, useRef } from 'react';
import io from "socket.io-client";
import ChatInput from '../Components/Chat/ChatInput';
import Message from '../Components/Chat/Message';
import "../style/Chat.css";
import { Navbar, Footer } from "../Components/Components";
import { useParams } from 'react-router-dom';
import BASE_URL from '../config.js';
import axios from "axios";

const socket = io("http://localhost:8000", {
    query: { userId: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null },
});

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [alumni, setAlumni] = useState(null);
    const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const { id } = useParams(); // ID de l'utilisateur à qui nous envoyons les messages
    const chatContainerRef = useRef(null);

    // Récupérer les messages existants
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/messages/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });                
                setMessages(response.data.data); // Charger les messages récupérés
            } catch (error) {
                console.error("Erreur de récupération des messages :", error);
            }
        };

        fetchMessages();
    }, [id]);

    // Récupérer les informations de l'utilisateur (alumni)
    useEffect(() => {
        const getAlumni = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/Users/${id}`);
                setAlumni(response.data.data);
            } catch (error) {
                console.error("Erreur de récupération de l'utilisateur :", error);
            }
        };

        getAlumni();
    }, [id]);

    // Écouter les messages entrants via Socket.IO
    useEffect(() => {
        socket.on("receiveMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    // Défilement automatique lorsque les messages changent
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Envoi d'un message
    const handleSendMessage = async (text) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/messages/send/${id}`,
                { message: text, senderId: currentUser._id },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            const newMessage = response.data.data;

            // Envoyer le message via Socket.IO
            socket.emit("sendMessage", {
                receiverId: id,
                senderId: currentUser._id,
                message: newMessage.message,
                createdAt : newMessage.createdAt
            });

            // Ajouter le message localement
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <div className="section-header align-center mt-5">
                    <h2 className="text-capitalize m-0 mt-5"><i className="bi bi-chat-dots-fill"></i> Établir de Nouveaux Liens</h2>
                </div>
                <div className="chat-wrapper d-flex flex-column mt-5">
                    <div className="chat-header">
                        <div className="profile-pic">
                            <img className="profile-pic" src={alumni?.photo.url} alt={alumni?.lastname} />
                        </div>
                        <span className="contact-name">{`${alumni?.firstname} ${alumni?.lastname}`}</span>
                    </div>
                    <div className="chat-container" ref={chatContainerRef}>
                        {messages.length === 0 ? (
                            <div className="no-messages">
                                <p>Commencez une nouvelle discussion !</p>
                            </div>
                        ) : (
                            messages?.map((msg, index) => (
                                <Message key={index} text={msg.message} isSender={msg.sender_id === currentUser._id} time={msg.createdAt} />
                            )))}
                    </div>
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Chat;*/

import React, { useEffect, useState, useRef, useContext } from "react";
import { SocketContext } from "../Context/SocketContext";
import ChatInput from "../Components/Chat/ChatInput";
import Message from "../Components/Chat/Message";
import "../style/Chat.css";
import { Navbar, Footer } from "../Components/Components";
import { useParams } from "react-router-dom";
import BASE_URL from "../config.js";
import axios from "axios";

const Chat = () => {
    const { socket, setUnreadMessages } = useContext(SocketContext);
    const [messages, setMessages] = useState([]);
    const [alumni, setAlumni] = useState(null);
    const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const { id } = useParams();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const getAlumni = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/Users/${id}`);
                setAlumni(response.data.data);
            } catch (error) {
                console.error("Erreur de récupération de l'utilisateur :", error);
            }
        };

        getAlumni();
    }, [id]);
    
    // Récupérer les messages existants
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/messages/${id}`, { 
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setMessages(response.data.data);

                // Marquer les messages comme lus
                setUnreadMessages((prev) => prev.filter((item) => item.senderId !== id));
            } catch (error) {
                console.error("Erreur de récupération des messages :", error);
            }
        };

        fetchMessages();
    }, [id, setUnreadMessages]);

    // Écouter les messages entrants via Socket.IO
    useEffect(() => {
        if (socket) {
            socket.on("receiveMessage", (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                socket.off("receiveMessage");
            };
        }
    }, [socket]);

    // Défilement automatique lorsque les messages changent
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Envoi d'un message
    const handleSendMessage = async (text) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/messages/send/${id}`,
                { message: text },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            const newMessage = response.data.data;

            // Envoyer le message via Socket.IO
            if (socket) {
                socket.emit("sendMessage", {
                    receiverId: id,
                    senderId: currentUser._id,
                    message: newMessage.message,
                    createdAt: newMessage.createdAt,
                });
            }

            // Ajouter le message localement
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <div className="section-header align-center mt-5">
                    <h2 className="text-capitalize m-0 mt-5"><i className="bi bi-chat-dots-fill"></i> Établir de Nouveaux Liens</h2>
                </div>
                <div className="chat-wrapper d-flex flex-column mt-5">
                    <div className="chat-header">
                        <div className="profile-pic">
                            <img className="profile-pic" src={alumni?.photo?.url} alt={alumni?.lastname} />
                        </div>
                        <span className="contact-name">{`${alumni?.firstname} ${alumni?.lastname}`}</span>
                    </div>
                    <div className="chat-container" ref={chatContainerRef}>
                        {messages.length === 0 ? (
                            <div className="no-messages">
                                <p>Commencez une nouvelle discussion !</p>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <Message
                                    key={index}
                                    text={msg.message}
                                    isSender={msg.sender_id === currentUser._id}
                                    time={msg.createdAt}
                                />
                            ))
                        )}
                    </div>
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Chat;

