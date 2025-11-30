import { Router } from 'express';
import authController from '#@/controllers/auth.controller.js';

const router = Router();

// Define your authentication routes here
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.delete('/logout', authController.logout);

export default router;
