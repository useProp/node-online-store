import { Router } from 'express';
const indexRouter = new Router();

import deviceRouter from './device.router.js';
import typeRouter from './type.router.js';
import brandRouter from './brand.router.js';
import userRouter from './user.router.js';

indexRouter.use('/user', userRouter);
indexRouter.use('/type', typeRouter);
indexRouter.use('/brand', brandRouter);
indexRouter.use('/device', deviceRouter);

export default indexRouter;