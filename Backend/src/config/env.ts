import dotenv from 'dotenv';
dotenv.config();

const requiredEnvVariable = ['MONGODB_URI'] as const;

for (const variable of requiredEnvVariable) {
  if (!process.env[variable]) {
    throw new Error(`missing Environment variable : ${variable}`);
  }
}

export const env = {
  backendUrl: String(process.env.BACKEND_URL),
  port: Number(process.env.BACKEND_PORT),
  mongodbUri: String(process.env.MONGODB_URI),
};
