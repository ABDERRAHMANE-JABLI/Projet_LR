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
