import { Request, Response, Next } from "restify"

class Validations {
  private checkData(data: string): boolean {
    return typeof data === "string"
  } 

  execute(req: Request, res: Response, next: Next) {
    const { name, course } = req.body
    
    if (!this.checkData(name) || !this.checkData(course)) {
      return res.json(400, { message: "Enter valid values" })
    }

    next()
  }
}

export const validations = new Validations()