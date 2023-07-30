import restify from "restify"
import dotenv from "dotenv" 
import cors from "cors"

import { validationsInBody } from "./modules/student/middlewares/validationsInBody.middleware"
import { studentController } from "./modules/student/controller"

dotenv.config()

const server = restify.createServer()

server.use(cors())
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.get("/student/getAll", studentController.getStudents)
server.post("/student", validationsInBody.execute, studentController.newStudent)

server.listen(process.env.PORT, () => {
  console.log("Server is running")
})