import express from 'express';
const router = express.Router();

import ThemeController from '../Controllers/ControllerTheme.js';
// Create a new EventTheme
router.post('/', ThemeController.createTheme);

// Get all EventTheme
router.get('/', ThemeController.getAllThemes);

// Get an EventTheme by ID
router.get('/:id', ThemeController.getThemesById);

// Update an EventTheme
router.put('/:id', ThemeController.updateThemes);

// Delete an EventTheme
router.delete('/:id', ThemeController.deleteThemes);

  
export default router;
