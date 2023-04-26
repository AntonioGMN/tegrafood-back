import { Router } from 'express';
import * as productsController from '../controllers/productsController.js';
import validateSchema from '../middlerware/schemaValidationMiddleware.js';
import validateToken from '../middlerware/validateToken.js';
import multerInstance from '../multer-config.js';
import productsSchema from '../schemas/productsSchema.js';

const productsRouter = Router();
productsRouter.use(validateToken);

productsRouter.post(
  '/products',
  multerInstance.single('image'),
  validateSchema(productsSchema),
  productsController.create,
);

productsRouter.get('/products', productsController.getAll);

productsRouter.get('/products/filters', productsController.getWithFilters);

productsRouter.put(
  '/product/update',
  multerInstance.single('image'),
  productsController.updateAll,
);

productsRouter.patch('/product/update', productsController.update);

export default productsRouter;
