
const express = require('express');
const router = express.Router();
import UserController from '../controllers/user.controller';

// Define routes and their handlers
router.get('/users', UserController);
router.post('/users', UserController.signUp);


export default router;