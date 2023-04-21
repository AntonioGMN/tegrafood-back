import { Router } from 'express';
import * as shoppingController from '../controllers/shoppingController.js';
import validateSchema from '../middlerware/schemaValidationMiddleware.js';
import validateToken from '../middlerware/validateToken.js';
import shoppingSchema from '../schemas/shoppingSchema.js';

const shoppingRouter = Router();
shoppingRouter.use(validateToken);
shoppingRouter.post(
  '/shopping',
  validateSchema(shoppingSchema),
  shoppingController.create,
);
shoppingRouter.get('/shopping/user', shoppingController.getByUserId);

export default shoppingRouter;
