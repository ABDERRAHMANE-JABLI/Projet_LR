import express from 'express';
const router = express.Router();

import levelController from '../Controllers/ControllerLevel.js';
// Create a new level
router.post('/', levelController.createLevel);

// Get all levels
router.get('/', levelController.getAllLevels);

// Get an level by ID
router.get('/:id', levelController.getLevelsById);

// Get an level by title
router.get('/:title', levelController.getLevelsByName);

// Update an level
router.put('/:id', levelController.updateLevel);

// Delete an level
router.delete('/:id', levelController.deleteLevel);

  
export default router;
