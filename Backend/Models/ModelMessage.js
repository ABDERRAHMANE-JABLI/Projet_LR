import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/***
 * @description Message schema
*/

const MessageSchema = new Schema(
    {
        sender_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        received_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false, // Par défaut, un message est non lu
        },
    },
    {
        timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    }
);

export const Messages = model("Messages", MessageSchema);
