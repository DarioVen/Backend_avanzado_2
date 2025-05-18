import dotenv from 'dotenv';
dotenv.config();

export default {
    mongoUrl: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 8080,
    jwt: {
        expiration: '24h',  // Valor fijo que representa una decisión de diseño
        cookieOptions: {
            httpOnly: true
        }
    }
};