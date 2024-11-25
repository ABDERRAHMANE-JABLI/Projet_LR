import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/***
 * @describ level : BUT / Licence / Licence Pro /  Master / Ingénierie /  Doctorat :
 */

const LevelSchema = new Schema({
    title:{
        type:String,
        trim : true,
        required : true,
        maxlength: 100,
    }
}
    ,{
        timestamps:true, 
    }
);

export const Levels = model("Levels", LevelSchema);

/* 
 
function validateLevelData(obj){
    const shema = object({
        title : string().trim().max(100).required()
    });
    return shema.validate(obj);
}
**/


