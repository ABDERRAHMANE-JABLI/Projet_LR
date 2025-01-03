import express from 'express';
const router = express.Router();

import EventController from '../Controllers/ControllerEvent.js';
// Create a new EventTheme
router.post('/', EventController.createEvent);

// Get all EventTheme
router.get('/:themeId', EventController.getAllEventsbycretaria);

// Get an EventTheme by ID
router.get('/:id', EventController.getEventsById);

// Delete an EventTheme
router.delete('/:id', EventController.deleteEvents);

  
export default router;
