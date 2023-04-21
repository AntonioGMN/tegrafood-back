import { Router } from 'express';
import * as productsController from '../controllers/productsController.js';
import validateSchema from '../middlerware/schemaValidationMiddleware.js';
import validateToken from '../middlerware/validateToken.js';
import loginSchema from '../schemas/loginSchema.js';
import multerInstance from '../multer-config.js';

const productsRouter = Router();
productsRouter.post(
  '/products',
  multerInstance.single('image'),
  productsController.create,
);
productsRouter.get('/products', productsController.getAll);
productsRouter.get('/products/filters', productsController.getWithFilters);
productsRouter.get(
  '/products/filters/category',
  productsController.getWithFilters,
);

export default productsRouter;
