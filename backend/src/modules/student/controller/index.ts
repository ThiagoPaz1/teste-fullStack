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
    const { page, pageSize } = req.query
    const pageData = isNaN(page) || page <= 0 ? 0 : page
    const pageSizeData = isNaN(pageSize) || pageSize <= 0 ? 10 : pageSize

    try {
      const students = await studentService.getAll(pageData, pageSizeData)
      res.json(200, students)
    } catch (error) {
      res.json(500, { error })
    }

    next()
  }

  async filterStudents(req: Request, res: Response, next: Next) {
    const { id, name, course } = req.query
    
    try {
      const students = await studentService.filter(id, name, course)
      res.json(201, students)
    } catch (error) {
      res.json(500, { error })
    }

    next()
  }

}

export const studentController = new StudentController()