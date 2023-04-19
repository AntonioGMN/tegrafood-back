import { Router } from 'express';
import userRouter from './userRouter.js';
import errorHandlingMiddleware from '../middlerware/errorHandlingMiddleware.js';
import imagesRouter from './imagesRouter.js';
import productsRouter from './productsRouter.js';
import shoppingRouter from './shppingRouter.js';

const router = Router();
router.use(userRouter);
router.use(imagesRouter);
router.use(productsRouter);
router.use(shoppingRouter);
router.use(errorHandlingMiddleware);
export default router;
