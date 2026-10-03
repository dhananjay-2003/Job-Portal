import { Router } from 'express';
import signupRoutes from '../modules/signup/signup.routes.js';

const router = Router();
router.use('/auth', signupRoutes);
export default router;
