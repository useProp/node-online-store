import { Router } from 'express';
import deviceController from '../controllers/device.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { checkRoleMiddleware } from '../middleware/role.middleware.js';
const router = new Router();

router.get('/', deviceController.getAll);

router.get('/:id', deviceController.getOne);

router.post('/',  authMiddleware, checkRoleMiddleware('ADMIN'), deviceController.create);
export default router;