import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const TokensSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
}
    ,{
        timestamps:true, 
    }
);

export const Tokens = model("Tokens", TokensSchema);



