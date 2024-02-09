import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URL = process.env.MONGODB_URL;
export const DB_NAME = process.env.DB_NAME;
export const DOMAIN_NAME = process.env.DOMAIN_NAME;
export const EMAIL_ID = process.env.EMAIL_ID;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;