import { Router } from 'express';
import { signupController } from './signup.controller.js';

const signupRoutes = Router();

signupRoutes.post('signup', signupController);

export default signupRoutes;
