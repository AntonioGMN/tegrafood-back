import { Router } from 'express';
import * as productsController from '../controllers/productsController.js';
import validateSchema from '../middlerware/schemaValidationMiddleware.js';
import validateToken from '../middlerware/validateToken.js';
import loginSchema from '../schemas/loginSchema.js';

const productsRouter = Router();
productsRouter.get('/products', productsController.getAll);
productsRouter.get('/products/filters', productsController.getWithFilters);
productsRouter.get(
  '/products/filters/category',
  productsController.getWithFilters,
);

export default productsRouter;
