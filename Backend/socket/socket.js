import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"], // URL de votre frontend
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId; // Récupération du userId depuis les requêtes Socket.IO
    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // Envoyer la liste des utilisateurs en ligne
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Événement pour l'envoi de message
    socket.on("sendMessage", (data) => {
        const { receiverId, message, senderId } = data;

        // Transmettre le message au destinataire
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", { senderId, message });
        }
    });

    // Gestion de la déconnexion
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        for (const [key, value] of Object.entries(userSocketMap)) {
            if (value === socket.id) {
                delete userSocketMap[key];
                break;
            }
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
