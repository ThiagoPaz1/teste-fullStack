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

    await sessionDB.run(query, datas)
  }

  async getAll(page: number, pageSize: number): Promise<{
    students: Student[],
    totalStudentsInPage: number
  }> {
    const query = `MATCH (s:Student) return s skip ${page} limit ${pageSize}`
    const studentsData = await sessionDB.run(query)
    const students: Student[] = studentsData.records.map(i => i.get("s").properties)

    return {
      totalStudentsInPage: students.length,
      students
    }
  }
}

export const studentRepository = new StudentRepository()