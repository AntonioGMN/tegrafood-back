import { Router } from 'express';
import * as shoppingController from '../controllers/shoppingController.js';
import validateSchema from '../middlerware/schemaValidationMiddleware.js';
import validateToken from '../middlerware/validateToken.js';
import loginSchema from '../schemas/loginSchema.js';

const shoppingRouter = Router();
shoppingRouter.post('/shopping', validateToken, shoppingController.create);

export default shoppingRouter;
