import express from 'express';
const router = express.Router();

import StudyFieldController from '../Controllers/ControllerStudyField.js';

// Create a new StudyField
router.post('/', StudyFieldController.createStudyField);

// Get all StudyFields
router.get('/', StudyFieldController.getAllStudyFields);

// Get a StudyField by ID
router.get('/:id', StudyFieldController.getStudyFieldById);

// Get a StudyField by title
router.get('/:title', StudyFieldController.getStudyFieldByName);

// Update a StudyField
router.put('/:id', StudyFieldController.updateStudyField);

// Delete a StudyField
router.delete('/:id', StudyFieldController.deleteStudyField);

export default router;