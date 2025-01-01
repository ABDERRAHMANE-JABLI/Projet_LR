import {Conversations} from "../Models/ModelConversation.js";
import {Messages} from "../Models/ModelMessage.js";
import { Users } from "../Models/ModelUser.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import mongoose from "mongoose";
/**-------------------------------------------------------
 * envoyer message 
 * @desc send message 
 * @route /api/messages/send/:idReceived
 * @method POST
 * @access private only user authentified
 ---------------------------------------------------*/
async function sendMessage(req, res){
	try {
		const { message} = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user.id
		console.log(senderId + " rrrrrrrrrr "+receiverId);
		
		let conversation = await Conversations.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversations.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Messages({
			sender_id: senderId,
            received_id: receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}
		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json({success : true, data : newMessage});

	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

/**-------------------------------------------------------
 * get all messages between the sender and the received 
 * @desc get conversation 
 * @route /api/messages/:idReceived
 * @method GET
 * @access private only user authentified
 ---------------------------------------------------*/

async function getMessages(req, res){
	try {
		const { id: receiverId } = req.params;
		const senderId = req.user.id

		const conversation = await Conversations.findOne({
			participants: { $all: [senderId, receiverId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES
		
		if (!conversation) return res.status(200).json({success : true, data : []});

		const messages = conversation.messages;
		if(messages){
			//Filtrer les messages non lus pour le destinataire pour modifier leur status
			const updatedMessages = await Messages.updateMany(
            	{ sender_id: receiverId , received_id: senderId, isRead: false }, 
            	{ $set: { isRead: true } } // Marquer comme lus
        	);
			if (updatedMessages.modifiedCount > 0) { console.log("msg marqués comme lus");}
		//---------------------------------------------------------------------------
		}
		// console.log(messages);
		res.status(200).json({success : true, data : messages});
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

/**-------------------------------------------------------
 * this functionnality will be used in the navbar
 * @desc get Unread Messages by the connected user :
 * @route /api/messages/unread-msg
 * @method GET
 * @access private only user authentified
 ---------------------------------------------------*/
/*async function getUnreadMessagesBySender(req, res){
    try {
        const userId = req.user.id; // L'utilisateur connecté (destinataire)
		console.log(userId);

        // Regrouper les messages non lus par expéditeur
        const unreadMessages = await Messages.aggregate([
			// Étape 1 : Filtrer les messages non lus pour l'utilisateur connecté
			{
				$match: {
					received_id: req.user.id, // Assurez-vous que req.user._id est un ObjectId
					isRead: false,
				},
			},
			// Étape 2 : Faire une jointure avec la collection Users pour récupérer les informations du sender
			{
				$lookup: {
					from: "Users", // Nom de la collection Users
					localField: "sender_id", // Champ dans la collection Messages
					foreignField: "_id", // Champ correspondant dans la collection Users
					as: "senderDetails", // Nom du champ où les résultats seront stockés
				},
			},
			// Étape 3 : Projeter les champs nécessaires
			{
				$project: {
					senderId: "$sender_id",
					count: { $sum: 1 }, // Compter chaque message
					senderName: { $arrayElemAt: ["$senderDetails.firstname", 0] }, // Récupérer le prénom
					senderLastName: { $arrayElemAt: ["$senderDetails.lastname", 0] }, // Récupérer le nom
				},
			},
			// Étape 4 : Grouper par senderId
			{
				$group: {
					_id: "$senderId",
					senderName: { $first: "$senderName" },
					senderLastName: { $first: "$senderLastName" },
					count: { $sum: 1 }, // Compter le nombre de messages non lus par expéditeur
				},
			},
		]);		

		console.log(unreadMessages);

        res.status(200).json({ success: true, data: unreadMessages });
    } catch (error) {
        console.error("Erreur lors de la récupération des messages non lus :", error.message);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};
*/

async function getUnreadMessagesBySender(req, res) {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id); // Convertir en ObjectId

        // Étape 1 : Récupérer tous les messages non lus pour l'utilisateur connecté
        const messages = await Messages.find({
            received_id: userId,
            isRead: false,
        }).lean();

        if (!messages.length) {
            return res.status(200).json({ success: true, data: [] }); // Aucun message non lu
        }

        // Étape 2 : Grouper les messages par sender_id
        const groupedMessages = {};
        messages.forEach((message) => {
            const senderId = message.sender_id.toString();
            if (!groupedMessages[senderId]) {
                groupedMessages[senderId] = { count: 0 };
            }
            groupedMessages[senderId].count += 1;
        });

        // Étape 3 : Récupérer les détails des expéditeurs
        const unreadDetails = await Promise.all(
            Object.keys(groupedMessages).map(async (senderId) => {
                const user = await Users.findById(senderId).select("firstname lastname").lean();
                return {
                    senderId,
                    count: groupedMessages[senderId].count,
                    senderName: user.firstname,
                    senderLastName: user.lastname,
                };
            })
        );

        // Retourner les résultats
        res.status(200).json({ success: true, data: unreadDetails });
		
    } catch (error) {
        console.error("Erreur lors de la récupération des messages non lus :", error.message);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
}

export default {
    sendMessage,
    getMessages,
	getUnreadMessagesBySender
}