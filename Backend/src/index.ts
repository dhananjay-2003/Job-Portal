import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const backendPort = Number(process.env.BACKEND_PORT) || 3000;

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(backendPort, () => {
  console.log(`Backend is running on port ${backendPort}`);
});
