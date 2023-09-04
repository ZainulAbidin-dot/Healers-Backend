
const express = require('express');
const userRouter = express.Router();
import UserController from '../controllers/user.controller';

userRouter.post('/user-sign-up', UserController.signUp);
userRouter.post('/user-sign-in', UserController.signIn);


export default userRouter;