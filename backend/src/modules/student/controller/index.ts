import { Request, Response, Next } from "restify"

import { studentService } from "../service"

class StudentController {
  async newStudent(req: Request, res: Response, next: Next) {
    const { name, course } = req.body

    try {
      await studentService.create({ name, course })
      res.json(201, { message: "Registered Student!" })
    } catch (error) {
      res.json(500, { error })
    }

    next()
  }

  async getStudents(req: Request, res: Response, next: Next) {
    try {
      const students = await studentService.getAll()
      res.json(200, students)
    } catch (error) {
      res.json(500, { error })
    }

    next()
  }
}

export const studentController = new StudentController()