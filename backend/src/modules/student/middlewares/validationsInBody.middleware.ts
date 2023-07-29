import { Request, Response, Next } from "restify"

class ValidationsInBody {
  async execute(req: Request, res: Response, next: Next) {
    const { name, course } = req.body
    const checkData = (data: string): boolean => typeof data === "string"

    if (!checkData(name) || !checkData(course)) {
      res.json(400, { message: "Enter valid values" })
      return next(false)
    }

    if (name.length < 3 || course < 4) {
      const message = "Name must be at least 3 characters long and course must be at least 4 characters long."

      res.json(400, { message })
      return next(false)
    }
  }
}

export const validationsInBody = new ValidationsInBody()