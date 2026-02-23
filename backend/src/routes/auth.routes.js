import express from 'express';
import { registerUser,loginUser,logoutUser,getMe } from '../controller/auth.controller.js';
const router = express.Router();
import { protectRoute } from '../middleware/auth.middleware.js';


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protectRoute, getMe);

export default router;