import restify from "restify"
import dotenv from "dotenv" 

dotenv.config()

const server = restify.createServer()

server.listen(process.env.PORT, () => {
  console.log("Server is running")
})