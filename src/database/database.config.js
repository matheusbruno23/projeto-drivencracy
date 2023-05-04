import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)

try {
    await mongoClient.connect()

} catch (error) {
    console.error(error.message)
}

export const db = mongoClient.db()