import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import app from './app.js';

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      console.log(`App is running on ${env.port} with connected Database`);
    });
  } catch (error) {
    console.log(`Failed to connect the database on ${env.port} due to Error:${error}`);
  }
};

startServer();
