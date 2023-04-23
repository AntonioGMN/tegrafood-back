import { Router } from 'express';
import * as shoppingController from '../controllers/shoppingController.js';
import validateSchema from '../middlerware/schemaValidationMiddleware.js';
import validateToken from '../middlerware/validateToken.js';
import {
  createShoppingSchema,
  onlyShoppingIdSchema,
  updateQuantitySchema,
} from '../schemas/shoppingSchema.js';

const shoppingRouter = Router();
shoppingRouter.use(validateToken);
shoppingRouter.post(
  '/shopping',
  validateSchema(createShoppingSchema),
  shoppingController.create,
);

shoppingRouter.get('/shopping/user', shoppingController.getByUserId);

shoppingRouter.patch(
  '/shopping/quantity',
  validateSchema(updateQuantitySchema),
  shoppingController.updateQuanity,
);

shoppingRouter.delete(
  '/shopping',
  validateSchema(onlyShoppingIdSchema),
  shoppingController.deleteById,
);

shoppingRouter.patch(
  '/shopping/finish',
  validateSchema(onlyShoppingIdSchema),
  shoppingController.finish,
);
export default shoppingRouter;
