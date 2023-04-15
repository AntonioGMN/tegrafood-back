import { Router } from 'express';
import userRouter from './userRouter.js';
import errorHandlingMiddleware from '../middlerware/errorHandlingMiddleware.js';
import imagesRouter from './imagesRouter.js';

const router = Router();
router.use(userRouter);
router.use(imagesRouter);
router.use(errorHandlingMiddleware);
export default router;
