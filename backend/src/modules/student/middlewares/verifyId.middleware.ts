import { Request, Response, Next } from "restify"

import { studentService } from "../service"

class VerifyId {
  async execute(req: Request, res: Response, next: Next) {
    const { id } = req.params
    const checkId = await studentService.filter(id, "", "")

    if (!checkId.students.length) {
      res.json(404, { message: "Id not found" })
      return next(false)
    }
  }
}

export const verifyId = new VerifyId()