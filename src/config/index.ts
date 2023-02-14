import dotenv from "dotenv";

dotenv.config()

export const config = {
    NODE_ENV: process.env.NODE_ENV || "dev",
    MONGODB_URL: process.env.MONGODB_URL || "",
    PORT: process.env.PORT 
}

module.exports = {
    config
}
