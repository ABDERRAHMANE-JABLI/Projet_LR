import { Users } from "../Models/ModelUser.js";
import { StudentLevels } from "../Models/ModelStudentLevel.js";
import { cloudinaryRemoveImage, cloudinaryUploadImage } from "../utils/cloudinary.js"
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { stat } from "fs/promises";


/**-------------------------------------------------------
 * @desc    Create a new User (Student or Admin)
 * @route   POST /api/user
 * @method  POST
 * @access  Private (Admin only)
 ---------------------------------------------------*/
 
async function createUser(req, res) {
  try {
    const result = await Users.create(req.body);
    res.status(201).json({ success: true, msg: 'User created successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Get all Students
 * @route   GET /api/user/students
 * @method  GET
 * @access  Private (Admin only)
 ---------------------------------------------------*/
async function getStudents(req, res) {
  try {
    const result = await Users.find({ role: 'Student' }); // Retrieve all users with role 'Student'
    res.status(200).json({ success: true, msg: 'Students fetched successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

/**-------------------------------------------------------
 * @desc    Get Students by Level, Year, and Study Field
 * @route   GET /api/user/students/:level/:year/:studyField
 * @method  GET
 * @access  Private (Admin only)
 ---------------------------------------------------*/
async function getStudentsByCriteria(req, res) {
    try {
      const { level, year, studyField } = req.params; // Retrieve criteria from the URL
      const result = await StudentLevels.find({
        level_id: level,
        year: year,
        studyField_id: studyField
      }).populate('user_id'); // Join with Users collection to get user details
  
      const students = result.map(studentLevel => studentLevel.user_id); // Extract user details
  
      if (!students || students.length === 0) return res.status(404).json({ success: false, msg: 'No students found' });
      res.status(200).json({ success: true, msg: 'Students fetched successfully', data: students });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
}


/**-------------------------------------------------------
 * @desc    Get a User by ID
 * @route   GET /api/user/:id
 * @method  GET
 * @access  Private (Admin or User)
 ---------------------------------------------------*/
async function getUserById(req, res) {
  try {
    const user = await Users.findById(req.params.id); // Find a user by ID
    if (!user) return res.status(404).json({ success: false, msg: 'User not found' });
    res.status(200).json({ success: true, msg: 'User fetched successfully', data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

/**-------------------------------------------------------
 * @desc    Update a User by ID
 * @route   PUT /api/user/:id
 * @method  PUT
 * @access  Private (Admin or User)
 ---------------------------------------------------*/
async function updateUser(req, res) {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ success: false, msg: 'User not found' });
    res.status(200).json({ success: true, msg: 'User updated successfully', data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

const updateUserStatus = async (req, res) => {
  try {
    const { statut } = req.body; // Extraire le statut depuis le corps de la requête
    
    // Vérification que le champ `status` est fourni
    if (typeof statut === "undefined") {
      return res.status(400).json({ success: false, msg: "Status is required" });
    }

    // Mettre à jour uniquement le champ `status` de l'utilisateur
    const user = await Users.findByIdAndUpdate(
      req.params.id, // ID de l'utilisateur à mettre à jour
      { statut }, // Champ à mettre à jour
      { new: true } // Retourne le document mis à jour
    );

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Réponse réussie
    res.status(200).json({
      success: true,
      msg: "User status updated successfully",
      data: statut,
    });
  } catch (error) {
    // Gérer les erreurs
    console.error("Maj statut :", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


/**-------------------------------------------------------
 * @desc    Delete a User by ID
 * @route   DELETE /api/user/:id
 * @method  DELETE
 * @access  Private (Admin only)
 ---------------------------------------------------*/
async function deleteUser(req, res) {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, msg: 'User not found' });
    res.status(200).json({ success: true, msg: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


// Pour obtenir __dirname dans les modules ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function userUploadPhoto(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: "No file provided" });
    }

    // Obtenir le chemin de l'image :
    const imgPath = path.join(__dirname, `../images/${req.file.filename}`);

    try {
        // Upload image to Cloudinary :
        const result = await cloudinaryUploadImage(imgPath);

        // Obtenir l'utilisateur qui souhaite modifier sa photo :
        const user = await Users.findById(req.params.id);
        if (user.photo.publicId !== null) {
            await cloudinaryRemoveImage(user.photo.publicId);
        }

        // Mettre à jour la photo de l'utilisateur
        user.photo = { url: result.secure_url, publicId: result.public_id };
        await user.save();

        res.status(200).json({
            message: "Profile photo uploaded successfully",
            photo: { url: result.secure_url, publicId: result.public_id },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    } finally {
        // Supprimer la photo du dossier local
        if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
        }
    }
}


export default {
  createUser,
  getStudentsByCriteria,
  getStudents,
  getUserById,
  updateUser,
  updateUserStatus,
  deleteUser,
  userUploadPhoto
};


