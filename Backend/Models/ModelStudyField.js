import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/***
 * @description Study Field : computer science, economics,  ...
 */

const StudyFieldSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200,
    },
    description: {
        type: String,
        trim: true,
    }
},
{
    timestamps: true,
});

export const StudyFields = model("StudyFields", StudyFieldSchema);



