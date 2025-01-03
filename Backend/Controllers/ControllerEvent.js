import { Events }  from "../Models/ModelEvents.js";

/**-------------------------------------------------------
 * @desc    Create a new Event
 * @route   POST /api/Events
 * @method  POST
 * @access  Private
 ---------------------------------------------------*/
async function createEvent(req, res) {
  try {
    // Vérifie si la date est inférieur à aujourd'hui
    if (new Date(presentationDate) < new Date()) {
      return res.status(200).json({ 
        success: false, 
        msg: 'date incorrecte'
      });
    }
    // To Do : sendEmail to students, telling theme there is a new event comming.
    const result = await Events.create(req.body); 
    res.status(201).json({ success: true, msg: 'Inserted successfully', data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Get all Events
 * @route   GET /api/Events/:theme?page=1&limit=5
 * @method  GET
 * @access  Public
 ---------------------------------------------------*/
 async function getAllEventsbycretaria(req, res) {
  try {
    // Récupérer `page`, `limit`, et `theme` depuis les paramètres de la requête
    const page = parseInt(req.query.page) || 1; // Page actuelle (par défaut 1)
    const limit = parseInt(req.query.limit) || 8; // Limite d'éléments par page (par défaut 8)
    const {themeId} = req.params; // Identifiant du thème
    const skip = (page - 1) * limit; // Calcul du nombre d'éléments à ignorer

    // Obtenir la date actuelle sans heure
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Construire le filtre
    const filter = {
      presentationDate: { $gte: today }
    };
    if (themeId) {
      filter.theme = themeId; // Ajouter la condition sur le thème si fournie
    }

    // Récupérer les événements avec les conditions et pagination
    const events = await Events.find(filter)
      .skip(skip)
      .limit(limit)
      .populate('theme'); // Remplir les détails du thème avec `populate`

    // Compter le total des documents qui répondent aux conditions
    const totalEvents = await Events.countDocuments(filter);

    res.status(200).json({
      success: true,
      msg: 'Events fetched successfully',
      data: events,
      pagination: {
        totalItems: totalEvents,
        currentPage: page,
        totalPages: Math.ceil(totalEvents / limit),
        itemsPerPage: limit
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}



/**-------------------------------------------------------
 * @desc    Get an Event by ID
 * @route   GET /api/Events/:id
 * @method  GET
 * @access  Public
 ---------------------------------------------------*/
async function getEventsById(req, res) {
  try {
    const Event = await Events.findById(req.params.id); // Trouve un Event par son ID
    if (!Event) return res.status(404).json({ success: false, msg: 'Events not found' });
    res.status(200).json({ success: true, msg: 'Events fetched successfully', data: Event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Update a Event by ID
 * @route   PUT /api/Events/:id
 * @method  PUT
 * @access  Private
 ---------------------------------------------------*/
async function updateEvents(req, res) {
  try {
    const Event = await Events.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Event) return res.status(404).json({ success: false, msg: 'Events not found' });
    res.status(200).json({ success: true, msg: 'Updated successfully', data: Event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


/**-------------------------------------------------------
 * @desc    Delete a Event by ID
 * @route   DELETE /api/Events/:id
 * @method  DELETE
 * @access  Private
 ---------------------------------------------------*/
async function deleteEvents(req, res) {
  try {
    const Event = await Events.findByIdAndDelete(req.params.id);
    if (!Event) return res.status(404).json({ success: false, msg: 'Events not found' });
    res.status(200).json({ success: true, msg: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export default {
  createEvent,
  getAllEventsbycretaria,
  getEventsById,
  deleteEvents,
  updateEvents,
};
