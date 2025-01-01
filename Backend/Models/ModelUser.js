import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import jwt from 'jsonwebtoken';

/***
 * @description Student or Admin
 */
import dotenv from "dotenv";
dotenv.config()

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
            url:"https://pixabay.com/get/gb59befd955651c9980aa87af902808888738951c98c97fb07e2061d38889f959bd1c58d809ff5cff5bd23ca8cc0d1c47237b6c9d9686c3dd552d3612273e230c9f9c2b5c5657aa25c98c726f2f359d6a_640.png",
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
    role:{ // Etudiant or Admin
        type : String,
        default : "Etudiant"
    },
    statut :{
        // etudiant / stagiaire / salarié.
        type : String,
        default : "Etudiant"
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


UserSchema.methods.generateAuthToken = function(){
    return jwt.sign({id:this._id, role:this.role}, process.env.JWT_secret)
}

export const Users = model("Users", UserSchema);
