import { Themes }  from "../Models/ModelTheme.js";

/**-------------------------------------------------------
 * @desc    Create a new EventTheme
 * @route   POST /api/Theme
 * @method  POST
 * @access  Private
 ---------------------------------------------------*/
async function createTheme(req, res) {
  try {
    const result = await Themes.create(req.body); 
    res.status(201).json({ success: true, msg: 'Inserted successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Get all Themes
 * @route   GET /api/Theme/
 * @method  GET
 * @access  Public
 ---------------------------------------------------*/
async function getAllThemes(req, res) {
  try {
    const result = await Themes.find(); // Récupère tous les Themes
    res.status(200).json({ success: true, msg: 'Themes fetched successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Get a Theme by ID
 * @route   GET /api/Theme/:id
 * @method  GET
 * @access  Public
 ---------------------------------------------------*/
async function getThemesById(req, res) {
  try {
    const Event = await Themes.findById(req.params.id); // Trouve un EventTheme par son ID
    if (!Event) return res.status(404).json({ success: false, msg: 'Themes not found' });
    res.status(200).json({ success: true, msg: 'Themes fetched successfully', data: Event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Update a Theme by ID
 * @route   PUT /api/Theme/:id
 * @method  PUT
 * @access  Private
 ---------------------------------------------------*/
async function updateThemes(req, res) {
  try {
    const Event = await Themes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Event) return res.status(404).json({ success: false, msg: 'Events not found' });
    res.status(200).json({ success: true, msg: 'Updated successfully', data: Event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Delete a Theme by ID
 * @route   DELETE /api/Theme/:id
 * @method  DELETE
 * @access  Private
 ---------------------------------------------------*/
async function deleteThemes(req, res) {
  try {
    const Event = await Themes.findByIdAndDelete(req.params.id);
    if (!Event) return res.status(404).json({ success: false, msg: 'Theme not found' });
    res.status(200).json({ success: true, msg: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


export default {
  createTheme,
  getAllThemes,
  getThemesById,
  deleteThemes,
  updateThemes,
};
