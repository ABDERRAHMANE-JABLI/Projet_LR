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
    const result = await StudentLevels.create(req.body);
    res.status(201).json({ success: true, msg: 'Student level entry created successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

/**-------------------------------------------------------
 * @desc    Delete a Student Level entry by ID
 * @route   DELETE /api/studentLevel/:id
 * @method  DELETE
 * @access  Private (Admin only)
 ---------------------------------------------------*/
async function deleteStudentLevel(req, res) {
  try {
    const studentLevel = await StudentLevels.findByIdAndDelete(req.params.id);
    if (!studentLevel) return res.status(404).json({ success: false, msg: 'Student level entry not found' });
    res.status(200).json({ success: true, msg: 'Student level entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export default {
  createStudentLevel,
  deleteStudentLevel
};

// Routes

