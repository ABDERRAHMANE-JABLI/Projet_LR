import { StudentLevels } from "../Models/ModelStudentLevel.js";
import express from 'express';
const router = express.Router();

/**-------------------------------------------------------
 * @desc    Create a new Student Level entry
 * @route   POST /api/studentLevel
 * @method  POST
 * @access  Private (Admin only)
 ---------------------------------------------------*/
async function createStudentLevel(req, res) {
  try {
    let diploma = await StudentLevels.findOne({user_id: req.body.user_id, level_id:req.body.level_id, studyField_id:req.body.studyField_id, year:req.body.year});
       if(diploma){
           return res.status(400).json({message : "Erreur dans l'éxecution de la requette"});
       }
    const result = await StudentLevels.create(req.body);
    res.status(201).json({ success: true, msg: 'Student level entry created successfully', data: result._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

/**-------------------------------------------------------
 * @desc    Delete a Student Level entry by ID
 * @route   DELETE /api/studentLevel/:id
 * @method  DELETE
 * @access  Private (Admin only or user him self)
 ---------------------------------------------------*/
async function deleteStudentLevel(req, res) {
  try {
    const studentLevel = await StudentLevels.findByIdAndDelete(req.params.id);
    if (!studentLevel) return res.status(404).json({ success: false, msg: 'Degre not found' });
    res.status(200).json({ success: true, msg: 'Degree deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

/**-------------------------------------------------------
 * @desc   get Student Degree by ID
 * @route   DELETE /api/StudentLevel/degree/:id
 * @method  GET
 * @access  Public
 ---------------------------------------------------*/
async function getDiplomasByUserId(req, res) {
  try {
    const diplomas = await StudentLevels.find({ user_id: req.params.id })
      .populate('level_id', 'title') // Charger uniquement le libellé du niveau
      .populate('studyField_id', 'title'); // Charger uniquement le libellé du domaine d'études

    if (!diplomas || diplomas.length === 0) {
      return res.status(200).json({
        success: false,
        msg: 'Aucun diplôme trouvé pour cet utilisateur',
        data : []
      });
    }

    // Formatage des données pour ne garder que les libellés
    const formattedDiplomas = diplomas.map((diploma) => ({
      id: diploma._id,
      level: diploma.level_id.title, // Libellé du niveau
      field: diploma.studyField_id.title, // Libellé du domaine d'études
      year: diploma.year, // Année
    }));

    res.status(200).json({
      success: true,
      msg: 'Diplômes récupérés avec succès',
      data: formattedDiplomas,
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des diplômes :', error.message);
    res.status(500).json({
      success: false,
      msg: 'Erreur lors de la récupération des diplômes',
      error: error.message,
    });
  }
}

export default {
  createStudentLevel,
  deleteStudentLevel,
  getDiplomasByUserId
};

// Routes

