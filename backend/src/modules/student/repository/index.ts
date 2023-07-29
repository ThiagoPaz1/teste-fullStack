import { v4 as uuidv4 } from "uuid"

import { CreateStudentDto } from "../dto/create-student.dto"
import { sessionDB } from "../../../database/connect"
import { Student } from "../types"

class StudentRepository {
  async create(studentData: CreateStudentDto): Promise<void> {
    const query = "CREATE (s:Student {id : $id, name: $name, course: $course})"
    const datas = {
      id: uuidv4(),
      name: studentData.name,
      course: studentData.course
    }

    try {
      await sessionDB.run(query, datas)
    } finally {
      await sessionDB.close()
    }
  }

  async getAll(): Promise<Student[]> {
    const query = "MATCH (s:Student) return s limit 10"

    try {
      const result = await sessionDB.run(query)
      const students: Student[] = result.records.map(i => i.get("s").properties)

      return students
    } finally {
      sessionDB.close()
    }
  }
}

export const studentRepository = new StudentRepository()