import neo4j from "neo4j-driver"
import dotenv from "dotenv"

dotenv.config()

const driver = neo4j.driver("neo4j://localhost:7687")

export const sessionDB = driver.session({
  database: process.env.DB_NAME,
  defaultAccessMode: neo4j.session.WRITE
})