import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = new Router();

router.post('/registration', userController.registration);

router.post('/login', userController.login);

router.get('/auth', authMiddleware, userController.check);
export default router;