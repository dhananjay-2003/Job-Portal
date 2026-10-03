import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import apiRoutes from './routes/index.js';

dotenv.config();

const app = express();

app.use(helmet());

app.use(express.json());

app.use('/api', apiRoutes);

export default app;
