import express from 'express';
const router = express.Router();

import StudentLevelController from '../Controllers/ControllerStudentLevel.js';

// Routes
router.post('/', StudentLevelController.createStudentLevel); // Create a new student level

router.delete('/:id', StudentLevelController.deleteStudentLevel); // Delete a student level by ID

router.get('/degree/:id', StudentLevelController.getDiplomasByUserId)
export default router;

  
