import { v4 as uuidv4 } from "uuid"

import { CreateStudentDto } from "../dto/create-student.dto"
import { sessionDB } from "../../../database/connect"

class StudentRepository {
  async create(studentData: CreateStudentDto): Promise<void> {
    const query = `CREATE (s:Student {id : '${uuidv4()}', name: '${studentData.name}', course: '${studentData.course}')`
    await sessionDB.run(query)
  }
}

export const studentRepository = new StudentRepository()