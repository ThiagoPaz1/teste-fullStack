import restify from "restify"
import dotenv from "dotenv" 

import { validations } from "./modules/student/middlewares/validations.middleware"
import { studentController } from "./modules/student/controller"

dotenv.config()

const server = restify.createServer()

server.use(restify.plugins.bodyParser())

server.post("/student", validations.execute, studentController.newStudent)

server.listen(process.env.PORT, () => {
  console.log("Server is running")
})