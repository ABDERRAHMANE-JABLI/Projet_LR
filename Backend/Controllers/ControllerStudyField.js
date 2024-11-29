import { StudyFields } from "../Models/ModelStudyField.js";

/**-------------------------------------------------------
 * @desc    Create a new StudyField
 * @route   POST /api/StudyField
 * @method  POST
 * @access  Private
 ---------------------------------------------------*/
async function createStudyField(req, res) {
  try {
    const result = await StudyFields.create(req.body);
    res.status(201).json({ success: true, msg: 'Inserted successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

/**-------------------------------------------------------
 * @desc    Get all StudyFields
 * @route   GET /api/StudyField
 * @method  GET
 * @access  Public
 ---------------------------------------------------*/
async function getAllStudyFields(req, res) {
  try {
    const result = await StudyFields.find(); // Retrieve all StudyFields
    res.status(200).json({ success: true, msg: 'StudyFields fetched successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

/**-------------------------------------------------------
 * @desc    Get a StudyField by ID
 * @route   GET /api/StudyField/:id
 * @method  GET
 * @access  Public
 ---------------------------------------------------*/
async function getStudyFieldById(req, res) {
  try {
    const StudyField = await StudyFields.findById(req.params.id); // Find a StudyField by its ID
    if (!StudyField) return res.status(404).json({ success: false, msg: 'StudyField not found' });
    res.status(200).json({ success: true, msg: 'StudyField fetched successfully', data: StudyField });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

/**-------------------------------------------------------
 * @desc    Get a StudyField by name
 * @route   GET /api/StudyField/:name
 * @method  GET
 * @access  Public
 ---------------------------------------------------*/
async function getStudyFieldByName(req, res) {
  try {
    const { name } = req.params; // Get the "name" parameter from the URL
    const StudyField = await StudyFields.findOne({ title: name }); // Find a document with the matching "title" field
    if (!StudyField) return res.status(404).json({ success: false, msg: 'StudyField not found' });
    res.status(200).json({ success: true, msg: 'StudyField fetched successfully', data: StudyField });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

/**-------------------------------------------------------
 * @desc    Update a StudyField by ID
 * @route   PUT /api/StudyField/:id
 * @method  PUT
 * @access  Private
 ---------------------------------------------------*/
async function updateStudyField(req, res) {
  try {
    const StudyField = await StudyFields.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!StudyField) return res.status(404).json({ success: false, msg: 'StudyField not found' });
    res.status(200).json({ success: true, msg: 'Updated successfully', data: StudyField });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

/**-------------------------------------------------------
 * @desc    Delete a StudyField by ID
 * @route   DELETE /api/StudyField/:id
 * @method  DELETE
 * @access  Private
 ---------------------------------------------------*/
async function deleteStudyField(req, res) {
  try {
    const StudyField = await StudyFields.findByIdAndDelete(req.params.id);
    if (!StudyField) return res.status(404).json({ success: false, msg: 'StudyField not found' });
    res.status(200).json({ success: true, msg: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export default {
  createStudyField,
  getAllStudyFields,
  getStudyFieldById,
  getStudyFieldByName,
  updateStudyField,
  deleteStudyField
};
