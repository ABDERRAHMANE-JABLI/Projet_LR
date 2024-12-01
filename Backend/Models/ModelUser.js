import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/***
 * @description Student or Admin
 */

const UserSchema = new Schema({
    firstname:{
        type:String,
        trim : true,
        required : true,
        maxlength: 50,
    },
    lastname:{
        type: String,
        trim : true,
        maxlength: 50,
        required : true
    },
    photo:{
        type: Object,
        default:{
            url:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png",
            publicId: null,
        }
    },
    email:{
        type: String,
        trim : true,
        unique: true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role:{ // student or admin
        type : String,
        required: true
    },
    isVerified :{
        type:Boolean,
        default: false,
    }
}
    ,{
        timestamps:true, 
    }
);

export const Users = model("Users", UserSchema);



