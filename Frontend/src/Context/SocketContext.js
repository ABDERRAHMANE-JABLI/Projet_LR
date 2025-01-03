import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import BASE_URL from "../config";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [unreadMessages, setUnreadMessages] = useState([]);

    useEffect(() => {
        const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

        if (currentUser) {
            // Initialiser le socket
            const newSocket = io("http://localhost:8000", {
                query: { userId: currentUser._id },
            });

            setSocket(newSocket);

            // Charger les messages non lus
            const fetchUnreadMessages = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/messages/unreadMsg`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    });
                    setUnreadMessages(response.data.data); // Charger les messages non lus dans l'état
                } catch (error) {
                    console.error("Erreur lors de la récupération des messages non lus :", error);
                }
            };

            fetchUnreadMessages();

            // Écouter les nouveaux messages via Socket.IO
            newSocket.on("newMessageReceived", (data) => {
                console.log("Message reçu via Socket:", data);

                // Mettre à jour les messages non lus
                setUnreadMessages((prev) => {
                    const existingSender = prev.find((item) => item.senderId === data.senderId);
                    if (existingSender) {
                        // Incrémenter le compteur
                        return prev.map((item) =>
                            item.senderId === data.senderId
                                ? { ...item, count: item.count + 1 }
                                : item
                        );
                    } else {
                        // Ajouter un nouveau sender
                        return [...prev, { senderId: data.senderId, count: 1, senderName: data.senderName }];
                    }
                });
            });

            // Nettoyage à la déconnexion
            return () => {
                newSocket.disconnect();
                setSocket(null);
            };
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket, unreadMessages, setUnreadMessages }}>
            {children}
        </SocketContext.Provider>
    );
};
