import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/***
 * @description theme ( insertion professionnelle, générale, outils de candidature, entretien d'embauche, ....)
*/

const ThemeSchema = new Schema({
    title:{
        type:String,
        trim : true,
        required : true,
        maxlength: 100,
    },
    description:{
        type:String
    }
}
    ,{
        timestamps:true, 
    }
);

export const Themes = model("Themes", ThemeSchema);



