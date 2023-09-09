
const express = require('express');
const userRouter = express.Router();
import UserController from '../controllers/user.controller';

userRouter.post('/', (req: any, res: any) => UserController.signUp(req, res));


export default userRouter;