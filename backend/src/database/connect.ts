import neo4j from "neo4j-driver"
import dotenv from "dotenv"

dotenv.config()

const driver =  neo4j.driver(
  "neo4j://localhost",
  neo4j.auth.basic(String(process.env.USERNAME), String(process.env.PASSWORD))
)

export const sessionDB = driver.session({ database: process.env.DB_NAME })