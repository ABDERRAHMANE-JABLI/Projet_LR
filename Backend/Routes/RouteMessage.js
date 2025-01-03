import express from "express";
import messageCtrl from "../Controllers/ControllerMessage.js";
import verify from "../Middlewares/verifyToken.js";

const router = express.Router();

//  /api/messages/unread-msg
router.get('/unreadMsg', verify.verifyStudentorAdmin, messageCtrl.getUnreadMessagesBySender);

// /api/messages/:idreceived
router.get('/:id', verify.verifyStudentorAdmin, messageCtrl.getMessages);

// /api/messages/send/:receivedid 
router.post('/send/:id', verify.verifyStudentorAdmin, messageCtrl.sendMessage);


export default router;
