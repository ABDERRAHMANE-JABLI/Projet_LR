import express from "express";
import authUser from "../Controllers/authUser.js";

const router = express.Router();

// /api/auth/register 
router.post('/registre', authUser.registerStudent);

// /api/auth/login
router.post('/login', authUser.LoginUser);

// /api/auth/verify/:userId/:token
router.get("/verify/:userId/:token", authUser.verifyUserAccountCtrl);

export default router;
