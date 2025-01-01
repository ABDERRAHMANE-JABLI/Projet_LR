import { Users } from "../Models/ModelUser.js";
import { StudentLevels } from "../Models/ModelStudentLevel.js";
import { cloudinaryRemoveImage, cloudinaryUploadImage } from "../utils/cloudinary.js"
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import bcrypt from 'bcryptjs';


/**-------------------------------------------------------
 * @desc    Create a new User (Student or Admin)
 * @route   POST /api/user
 * @method  POST
 * @access  Private (Admin only)
 ---------------------------------------------------*/
 
async function createUser(req, res) {
    console.log(req.body.password);
    let user = await Users.findOne({email: req.body.email});
    if(user){
       return res.status(400).json({success:false, msg : "Compte déja existe dans la base de donnée"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    // Remplacer le mot de passe en clair par le mot de passe hashé
    req.body.password = hashedPass;
    const result = await Users.create(req.body);
    res.status(201).json({ success: true, msg: 'User created successfully', data: result });
}


/**-------------------------------------------------------
 * @desc    Get all Students with Pagination
 * @route   GET /api/user/students?page=1
 * @method  GET
 * @access  Private (Admin only)
 ---------------------------------------------------*/
 async function getStudents(req, res) {
  try {
    // Paramètres de pagination
    const page = parseInt(req.query.page) || 1; // Page actuelle (par défaut : 1)
    const limit = 10; // Nombre d'étudiants par page
    const skip = (page - 1) * limit; // Nombre de documents à ignorer

    // Récupérer les étudiants avec pagination
    const students = await Users.find({ role: 'etudiant' })
      .skip(skip) // Ignorer les premiers 'skip' documents
      .limit(limit) // Limiter à 'limit' documents
      .exec();

    // Compter le total d'étudiants pour calculer les pages disponibles
    const totalStudents = await Users.countDocuments({ role: 'etudiant' });
    const totalPages = Math.ceil(totalStudents / limit);

    // Répondre avec les étudiants paginés et les métadonnées de pagination
    res.status(200).json({
      success: true,
      msg: 'Students fetched successfully',
      data: students,
      pagination: {
        totalStudents,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Get Students by Study Field, Level, and Year
 * @route   GET /api/user/students/:studyField?level=:level&year=:year
 * @method  GET
 * @access  Private (student and admin)
 ---------------------------------------------------*/
 /*
 async function getStudentsByCriteria(req, res) {
  try {
      const { studyField } = req.params; // Retrieve mandatory study field from the URL
      const { level, year } = req.query; // Retrieve optional level and year from query parameters
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const limit = parseInt(req.query.limit) || 8; // Default to 8 items per page if not provided
      const skip = (page - 1) * limit;

      // Validate that studyField is provided
      if (!studyField) {
          return res.status(400).json({ success: false, msg: 'Study field is required' });
      }

      // Build the query dynamically
      const query = { studyField_id: studyField };
      if (level) {
          query.level_id = level; // Add level to the query if provided
      }
      if (year) {
          query.year = year; // Add year to the query if provided
      }

      const result = await StudentLevels.find(query)
          .populate({
              path: 'user_id',
              match: { role: "etudiant" }, // Populate user details
              select: '_id firstname lastname photo.url statut' // Select specific fields
          })
          .populate({
              path: 'level_id', // Populate level details
              select: 'title' // Select only the title of the level
          });

      // Process the results to group data by user and avoid duplicates
      const studentMap = {};

      result.forEach(studentLevel => {
          const userId = studentLevel.user_id._id.toString();
          if (!studentMap[userId]) {
              studentMap[userId] = {
                  _id: studentLevel.user_id._id,
                  firstname: studentLevel.user_id.firstname,
                  lastname: studentLevel.user_id.lastname,
                  photo: studentLevel.user_id.photo?.url || null,
                  statut: studentLevel.user_id.statut,
                  diplomas: []
              };
          }
          // Add the diploma title to the student's diplomas array
          if (studentLevel.level_id && studentLevel.level_id.title) {
              studentMap[userId].diplomas.push(studentLevel.level_id.title);
          }
      });

      // Convert the map back to an array for the response
      const students = Object.values(studentMap).slice(skip, skip + limit);

      if (!students || students.length === 0) {
          return res.status(200).json({ success: false, msg: 'No students found', data: [] });
      }

      const total = Object.keys(studentMap).length;

      res.status(200).json({
          success: true,
          msg: 'Students fetched successfully',
          data: students,
          pagination: {
              total,
              page,
              limit,
              totalPages: Math.ceil(total / limit)
          }
      });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
}
*/

/**-------------------------------------------------------
 * @desc    Get Students by Study Field, Level, and Year
 * @route   GET /api/user/students/:studyField?level=:level&year=:year
 * @method  GET
 * @access  Private (student and admin)
 ---------------------------------------------------*/
 async function getStudentsByCriteria(req, res) {
  try {
      const { studyField } = req.params; // Retrieve mandatory study field from the URL
      const { level, year } = req.query; // Retrieve optional level and year from query parameters
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const limit = parseInt(req.query.limit) || 8; // Default to 8 items per page if not provided
      const skip = (page - 1) * limit;

      // Validate that studyField is provided
      if (!studyField) {
          return res.status(400).json({ success: false, msg: 'Study field is required' });
      }

      // Build the query dynamically
      const query = { studyField_id: studyField };
      if (level) {
          query.level_id = level; // Add level to the query if provided
      }
      if (year) {
          query.year = year; // Add year to the query if provided
      }

      const result = await StudentLevels.find(query)
          .populate({
              path: 'user_id', // Populate user details
              match: { role: "etudiant" }, // Filter users with role "etudiant"
              select: '_id firstname lastname email photo.url statut role' // Select specific fields
          })
          .populate({
              path: 'level_id', // Populate level details
              select: 'title' // Select only the title of the level
          });

      // Filter out null values for users that don't match the role
      const filteredResult = result.filter(studentLevel => studentLevel.user_id !== null);

      // Process the results to group data by user and avoid duplicates
      const studentMap = {};

      filteredResult.forEach(studentLevel => {
          const userId = studentLevel.user_id._id.toString();
          if (!studentMap[userId]) {
              studentMap[userId] = {
                  _id: studentLevel.user_id._id,
                  firstname: studentLevel.user_id.firstname,
                  lastname: studentLevel.user_id.lastname,
                  email: studentLevel.user_id.email,
                  photo: studentLevel.user_id.photo?.url || null,
                  statut: studentLevel.user_id.statut,
                  diplomas: []
              };
          }
          // Add the diploma title to the student's diplomas array
          if (studentLevel.level_id && studentLevel.level_id.title) {
              studentMap[userId].diplomas.push(studentLevel.level_id.title);
          }
      });

      // Convert the map back to an array for the response
      const students = Object.values(studentMap).slice(skip, skip + limit);

      if (!students || students.length === 0) {
          return res.status(200).json({ success: false, msg: 'No students found', data: [] });
      }

      const total = Object.keys(studentMap).length;

      res.status(200).json({
          success: true,
          data: students,
          pagination: {
              total,
              page,
              limit,
              totalPages: Math.ceil(total / limit)
          }
      });
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

/**-------------------------------------------------------
 * @desc    Update a User by ID
 * @route   PUT /api/user/:id/status
 * @method  PUT
 * @access  Private (Admin or User)
 ---------------------------------------------------*/
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


