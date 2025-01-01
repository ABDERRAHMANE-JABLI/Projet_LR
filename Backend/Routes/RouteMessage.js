import express from "express";
import messageCtrl from "../Controllers/ControllerMessage.js";
import verify from "../Middlewares/verifyToken.js";

const router = express.Router();

// /api/messages/send/:receivedid 
router.post('/send/:id', verify.verifyStudentorAdmin, messageCtrl.sendMessage);

// /api/messages/:idreceived
router.get('/:id', verify.verifyStudentorAdmin, messageCtrl.getMessages);

export default router;
