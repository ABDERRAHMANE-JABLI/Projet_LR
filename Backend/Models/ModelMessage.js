import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/***
 * @description Message schema
 */

const MessageSchema = new Schema({
    sender_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
    received_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
    },
    message : {
        type : String,
        required : true
    }

}
    ,{
        timestamps:true, 
    }
);

export const Messages = model("Messages", MessageSchema);
