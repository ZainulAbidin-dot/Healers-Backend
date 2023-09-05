
const express = require('express');
const userRouter = express.Router();
import UserController from '../controllers/user.controller';

userRouter.post('/user-sign-up', (req: any, res: any) => UserController.signUp(req, res));
userRouter.post('/user-sign-in', (req: any, res: any) => UserController.signIn(req, res));


export default userRouter;