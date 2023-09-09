
const express = require('express');
const authRouter = express.Router();
import AuthController from '../controllers/auth.controller';

authRouter.post('/sign-in', (req: any, res: any) => AuthController.signIn(req, res));


export default authRouter;