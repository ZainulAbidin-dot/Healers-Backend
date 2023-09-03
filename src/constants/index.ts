const PORT: number = Number(process.env.PORT) || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET ?? "secret";

export const Constants = {
    PORT,
    DATABASE_URL,
    JWT_SECRET
}