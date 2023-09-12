import { Router } from 'express';
import brandController from '../controllers/brand.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { checkRoleMiddleware } from '../middleware/role.middleware.js';
const router = new Router();

router.get('/', brandController.getAll);

router.post('/', authMiddleware, checkRoleMiddleware('ADMIN'), brandController.create);
export default router;