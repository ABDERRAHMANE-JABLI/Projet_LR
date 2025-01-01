// services/api.js
export const getConversation = async (conversationId) => {
    // Simule une réponse de l'API avec les messages et les participants
    return {
      participants: [
        { id: "1", name: "Tony Stark" },
        { id: "2", name: "Peter Parker" },
      ],
      messages: [
        { id: "1", sender_id: "1", message: "Hey, man! What's up?" },
        { id: "2", sender_id: "2", message: "Field trip! 🤣" },
        { id: "3", sender_id: "1", message: "Stay safe, kid." },
      ],
    };
  };
  
  export const sendMessage = async (conversationId, messageData) => {
    // Simule l'envoi d'un message
    return {
      id: new Date().getTime(), // ID simulé
      ...messageData,
    };
  };
  