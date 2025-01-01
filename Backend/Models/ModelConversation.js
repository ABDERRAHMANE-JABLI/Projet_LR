import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/***
 * @description Conversation schema
 */

const ConversationSchema = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messages',
            default : []
        }
    ],

}
    ,{
        timestamps:true, 
    }
);

export const Conversations = model("Conversations", ConversationSchema);
