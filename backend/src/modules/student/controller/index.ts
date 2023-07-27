import { Request, Response } from "restify"

import { studentService } from "../service"

class StudentController {
  async newStudent(req: Request, res: Response) {
    const { name, course } = req.body

    try {
      await studentService.create({ name, course })
      return res.status(201)
    } catch (error) {
      return res.json(500, { error })
    }
  }
}

export const studentController = new StudentController()