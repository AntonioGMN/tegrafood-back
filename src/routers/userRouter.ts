import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import validateSchema from '../middlerware/schemaValidationMiddleware.js';
import validateToken from '../middlerware/validateToken.js';
import loginSchema from '../schemas/loginSchema.js';
import userSchema from '../schemas/userSchema.js';
import multerInstance from '../multer-config.js';

const userRouter = Router();
userRouter.get('/user', validateToken, userController.findById);
userRouter.post('/login', validateSchema(loginSchema), userController.login);
userRouter.post(
  '/signUp',
  multerInstance.single('image'),
  validateSchema(userSchema),
  userController.sighUp,
);
userRouter.delete('/logout', validateToken, userController.logout);
userRouter.put('/user/refresh', userController.refleshToken);

export default userRouter;
