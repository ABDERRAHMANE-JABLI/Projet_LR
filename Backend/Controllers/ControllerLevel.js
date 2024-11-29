import { Levels }  from "../Models/ModelLevel.js";

/**-------------------------------------------------------
 * @desc    Create a new Level
 * @route   POST /api/Level
 * @method  POST
 * @access  Private
 ---------------------------------------------------*/
async function createLevel(req, res) {
  try {
    const result = await Levels.create(req.body); 
    res.status(201).json({ success: true, msg: 'Inserted successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Get all Levels
 * @route   GET /api/Level
 * @method  GET
 * @access  Public
 ---------------------------------------------------*/
async function getAllLevels(req, res) {
  try {
    const result = await Levels.find(); // Récupère tous les niveaux
    res.status(200).json({ success: true, msg: 'Levels fetched successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Get a Levels by ID
 * @route   GET /api/Levels/:id
 * @method  GET
 * @access  Public
 ---------------------------------------------------*/
async function getLevelsById(req, res) {
  try {
    const Level = await Levels.findById(req.params.id); // Trouve un niveau par son ID
    if (!Level) return res.status(404).json({ success: false, msg: 'Levels not found' });
    res.status(200).json({ success: true, msg: 'Levels fetched successfully', data: Level });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Get a Levels by name
 * @route   GET /api/Levels/:name
 * @method  GET
 * @access  Public
 ---------------------------------------------------*/
async function getLevelsByName(req, res) {
  try {
    const { name } = req.params; // Récupère le paramètre "name" depuis l'URL
    const Level = await Levels.findOne({ title: name }); // Cherche un document avec le champ "title" correspondant
    if (!Level) return res.status(404).json({ success: false, msg: 'Levels not found' });
    res.status(200).json({ success: true, msg: 'Levels fetched successfully', data: Level });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Update a Levels by ID
 * @route   PUT /api/Levels/:id
 * @method  PUT
 * @access  Private
 ---------------------------------------------------*/
async function updateLevel(req, res) {
  try {
    const Level = await Levels.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Level) return res.status(404).json({ success: false, msg: 'Levels not found' });
    res.status(200).json({ success: true, msg: 'Updated successfully', data: Level });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Delete a Levels by ID
 * @route   DELETE /api/Levels/:id
 * @method  DELETE
 * @access  Private
 ---------------------------------------------------*/
async function deleteLevel(req, res) {
  try {
    const Level = await Levels.findByIdAndDelete(req.params.id);
    if (!Level) return res.status(404).json({ success: false, msg: 'Levels not found' });
    res.status(200).json({ success: true, msg: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


export default {
  createLevel,
  getAllLevels,
  getLevelsById,
  getLevelsByName,
  updateLevel,
  deleteLevel
};
