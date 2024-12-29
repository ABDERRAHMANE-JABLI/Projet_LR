// Routes
import express from 'express';
const router = express.Router();
import userController from '../Controllers/ControllerUser.js';
import photoUpload from "../Middlewares/uploadPhoto.js";


// Create a new user (Admin only)
router.post('/', userController.createUser);

// Get students by level, year, studyField
router.get('/alumnis/:studyField', userController.getStudentsByCriteria);

// Get all students
router.get('/students', userController.getStudents);

// Get a user by ID (Admin or User)
router.get('/:id', userController.getUserById);

// Update a user by ID (Admin)
router.put('/:id', userController.updateUser);

// Update status
router.put("/:id/status", userController.updateUserStatus);

// Delete a user by ID (Admin only)
router.delete('/:id', userController.deleteUser);

//:id//
router.route("/:id/upload_photo").put(photoUpload.single("image"), userController.userUploadPhoto);


export default router;