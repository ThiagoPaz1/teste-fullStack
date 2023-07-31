import restify from "restify"
import dotenv from "dotenv"
import cors from "cors"

import { studentController } from "./modules/student/controller"
import { validationsInBody, verifyId } from "./modules/student/middlewares"

dotenv.config()

const server = restify.createServer()

server.use(cors())
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.get("/student/getAll", studentController.getStudents)
server.get("/student/filter", studentController.filterStudents)

server.post("/student", validationsInBody.execute, studentController.newStudent)

server.put("/student/:id", verifyId.execute, studentController.updateStudent)

server.del("/student/:id", verifyId.execute, studentController.deleteStudent)

server.listen(process.env.PORT, () => {
  console.log("Server is running")
})