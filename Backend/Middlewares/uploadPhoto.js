import path from "path";
import { fileURLToPath } from "url";

// Pour obtenir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import multer from "multer";

// Emplacement des photos
const photoStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../images"));
    },
    filename: function(req, file, cb) {
        if (file) {
            cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
        } else {
            cb(null, false); // Pas de nom pour l'image
        }
    }
});

// Middleware photo upload :
const photoUpload = multer({
    storage: photoStorage,
    fileFilter: function(req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb({ message: "unsupported MIME Type" }, false);
        }
    },
    limits: { fileSize: 1024 * 1024 * 5 }
});

export default photoUpload;
