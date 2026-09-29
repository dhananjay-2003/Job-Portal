import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const backendPort = process.env.BACKEND_PORT;

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(backendPort, () => {
  console.log(`Backend is running on port ${backendPort}`);
});
