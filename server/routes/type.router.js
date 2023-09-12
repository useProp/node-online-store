import { Router } from 'express';
import typeController from '../controllers/type.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { checkRoleMiddleware } from '../middleware/role.middleware.js';
const router = new Router();

router.get('/', typeController.getAll);

router.post('/',  authMiddleware, checkRoleMiddleware('ADMIN'), typeController.create);
export default router;