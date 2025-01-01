/*import React, { useEffect, useState } from 'react'
import ChatInput from '../Components/Chat/ChatInput';
import Message from '../Components/Chat/Message';
import { getConversation, sendMessage } from "./services.js";
import "../style/Chat.css";
import { Navbar, Footer } from "../Components/Components";
import { useParams } from 'react-router-dom';
import BASE_URL from '../config.js';
import axios from "axios"

const Chat = () => {

    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const currentUserId = "2"; // ID de l'utilisateur actuel

    const [currentUser, setcurrentUser] = useState(null);
    const [alumni, setAlumni] = useState(null);
    const { id } = useParams();

    // Vérifie localStorage pour un utilisateur existant
    useEffect(() => {
        const getAlumni = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    setcurrentUser(JSON.parse(storedUser)); // Stocke l'utilisateur dans le state
                } else {
                    return;
                }
                const response = await axios.get(`${BASE_URL}/Users/${id}`);
                const data = response.data.data;
                console.log(data);
                
                setAlumni(data);
            } catch (error) {
                console.log(error);
            }
        }
        getAlumni();
    }, []);

    // Charger la conversation et les messages
    useEffect(() => {
        const fetchConversation = async () => {
            const data = await getConversation("conversationId"); // Simule une ID de conversation
            setConversation(data);
            setMessages(data.messages);
        };
        fetchConversation();
    }, []);

    // Gérer l'envoi d'un message
    const handleSendMessage = async (text) => {
        const newMessage = await sendMessage("conversationId", {
            sender_id: currentUserId,
            message: text,
        });

        setMessages([...messages, newMessage]);
    };


    return (
        <>
            <Navbar />
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <div className="section-header align-center mt-5">
                    <h2 className="text-capitalize m-0 mt-5"><i class="bi bi-chat-dots-fill"></i> Établir de Nouveaux Liens</h2>
                </div>
                <div className="chat-wrapper d-flex mt-5">
                    {/* En-tête }
                    {conversation && (
                        <div className="chat-header">
                            <div className="profile-pic">
                                <img className="profile-pic" src={alumni?.photo.url} alt={alumni?.lastname} />
                            </div>
                            <span className="contact-name">
                                {alumni?.firstname+" "+alumni?.lastname}
                            </span>
                        </div>
                    )}

                    {/* Messages }
                    <div className="chat-container">
                        {messages.map((msg) => (
                            <Message
                                key={msg.id}
                                text={msg.message}
                                isSender={msg.sender_id === currentUserId}
                            />
                        ))}
                    </div>

                    {/* Saisie de message }
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>
            <Footer />
        </>
    );
}


export default Chat*/

import React, { useEffect, useState, useRef } from 'react';
import ChatInput from '../Components/Chat/ChatInput';
import Message from '../Components/Chat/Message';
import { getConversation, sendMessage } from "./services.js";
import "../style/Chat.css";
import { Navbar, Footer } from "../Components/Components";
import { useParams } from 'react-router-dom';
import BASE_URL from '../config.js';
import axios from "axios";

const Chat = () => {
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const currentUserId = "2"; // ID de l'utilisateur actuel
    const [currentUser, setcurrentUser] = useState(null);
    const [alumni, setAlumni] = useState(null);
    const { id } = useParams();

    const chatContainerRef = useRef(null); // Référence pour le conteneur des messages

    // Vérifie localStorage pour un utilisateur existant
    useEffect(() => {
        const getAlumni = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    setcurrentUser(JSON.parse(storedUser)); // Stocke l'utilisateur dans le state
                } else {
                    return;
                }
                const response = await axios.get(`${BASE_URL}/Users/${id}`);
                const data = response.data.data;
                setAlumni(data);
            } catch (error) {
                console.log(error);
            }
        };
        getAlumni();
    }, []);

    // Charger la conversation et les messages
    useEffect(() => {
        const fetchConversation = async () => {
            const data = await getConversation("conversationId"); // Simule une ID de conversation
            setConversation(data);
            setMessages(data.messages);
        };
        fetchConversation();
    }, []);

    // Défilement automatique vers le bas lorsque les messages changent
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Gérer l'envoi d'un message
    const handleSendMessage = async (text) => {
        const newMessage = await sendMessage("conversationId", {
            sender_id: currentUserId,
            message: text,
        });

        setMessages([...messages, newMessage]);
    };

    return (
        <>
            <Navbar />
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <div className="section-header align-center mt-5">
                    <h2 className="text-capitalize m-0 mt-5"><i className="bi bi-chat-dots-fill"></i> Établir de Nouveaux Liens</h2>
                </div>
                <div className="chat-wrapper d-flex mt-5">
                    {/* En-tête */}
                    {conversation && (
                        <div className="chat-header">
                            <div className="profile-pic">
                                <img className="profile-pic" src={alumni?.photo.url} alt={alumni?.lastname} />
                            </div>
                            <span className="contact-name">
                                {alumni?.firstname + " " + alumni?.lastname}
                            </span>
                        </div>
                    )}

                    {/* Messages */}
                    <div className="chat-container" ref={chatContainerRef}>
                        {messages.map((msg) => (
                            <Message
                                key={msg.id}
                                text={msg.message}
                                isSender={msg.sender_id === currentUserId}
                            />
                        ))}
                    </div>

                    {/* Saisie de message */}
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Chat;
