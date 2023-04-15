import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import validateSchema from '../middlerware/schemaValidationMiddleware.js';
import validateToken from '../middlerware/validateToken.js';
import loginSchema from '../schemas/loginSchema.js';
import userSchema from '../schemas/userSchema.js';
import multerInstance from '../multer-config.js';

const userRouter = Router();
userRouter.get('/toto', function (req, res) {
  res.send(200);
});
userRouter.get('/user', validateToken, userController.findById);
userRouter.post(
  '/signUp',
  multerInstance.single('image'),
  validateSchema(userSchema),
  userController.sighUp,
);
userRouter.post('/login', validateSchema(loginSchema), userController.login);
userRouter.delete('/logout', validateToken, userController.logout);

export default userRouter;
