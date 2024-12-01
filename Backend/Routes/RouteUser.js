// Routes
import express from 'express';
const router = express.Router();
import userController from '../Controllers/ControllerUser.js';

// Create a new user (Admin only)
router.post('/', userController.createUser);

// Get students by level, year, studyField
router.get('/students/:level/:year/:studyField', userController.getStudentsByCriteria);

// Get all students
router.get('/students', userController.getStudents);

// Get a user by ID (Admin or User)
router.get('/:id', userController.getUserById);

// Update a user by ID (Admin or User)
router.put('/:id', userController.updateUser);

// Delete a user by ID (Admin only)
router.delete('/:id', userController.deleteUser);

export default router;