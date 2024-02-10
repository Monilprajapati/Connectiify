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
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;