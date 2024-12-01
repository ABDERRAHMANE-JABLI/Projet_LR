import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/***
 * @description Schema for Student Levels, representing the level obtained by a student, the year it was obtained, and the study field
 */
const StudentLevelSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    level_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Levels',
        required: true
    },
    studyField_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudyFields',
        required: true
    },
    year: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

export const StudentLevels = model("StudentLevels", StudentLevelSchema);