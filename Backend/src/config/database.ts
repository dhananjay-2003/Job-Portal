import mongoose from 'mongoose';
import { env } from './env.js';

import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongodbUri);
    console.log('Database Connected Successfully');
  } catch (error) {
    console.log('Failed to connect Database', error);
    process.exit(1);
  }
};
