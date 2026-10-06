import { Router } from 'express';
import { signupController } from './signup/signup.controller.js';
import { login } from './login/login.controller.js';
import { getUser } from './user/user.controller.js';
import { AuthenticateMiddleware } from '../../middleware/authenticate.middleware.js';
import { refreshToken } from './refresh/refresh.controller.js';

const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/login', login);
authRouter.post('/refreshToken', refreshToken);
authRouter.get('/user', AuthenticateMiddleware, getUser);
export default authRouter;
