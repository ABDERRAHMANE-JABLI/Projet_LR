import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/***
 * @description Event schéma
*/

const EventSchema = new Schema({
    title:{
        type:String,
        trim : true,
        required : true,
        maxlength: 100,
    },
    content:{
        type:String,
        trim : true,
    },
    link:{
        type:String,
        trim : true,
    },
    image:{
        type: Object,
        default:{
            url:"",
            publicId: null,
        }
    },
    theme:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EventThemes',
        },
    presentedBy : { // admin ou ancien etudiant // currentUser
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    presentationDate : {
        type : Date
    }
    
}
    ,{
        timestamps:true, 
    }
);

export const Events = model("Events", EventSchema);
