import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js';

dotenv.config();

const app = express();

app.use('/api', apiRoutes);

export default app;
