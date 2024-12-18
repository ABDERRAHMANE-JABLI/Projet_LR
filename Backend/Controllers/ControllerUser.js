import { Users } from "../Models/ModelUser.js";
import { StudentLevels } from "../Models/ModelStudentLevel.js";

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

export default {
  createUser,
  getStudentsByCriteria,
  getStudents,
  getUserById,
  updateUser,
  deleteUser
};


