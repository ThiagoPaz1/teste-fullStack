import { Request, Response, Next } from "restify"

import { studentService } from "../service"

class StudentController {
  async newStudent(req: Request, res: Response, _next: Next) {
    const { name, course } = req.body

    try {
      await studentService.create({ name, course })
      res.status(201)
    } catch (error) {
      res.json(500, { error })
    }
  }
}

export const studentController = new StudentController()