import { studentRepository } from "../repository"
import { CreateStudentDto } from "../dto/create-student.dto"
import { Student } from "../types"

class StudentService {
  async create(studentData: CreateStudentDto): Promise<void> {
    await studentRepository.create(studentData)
  }

  async getAll(page: number, pageSize: number): Promise<{
    students: Student[],
    totalStudentsInPage: number
  }> {
    return await studentRepository.getAll(page, pageSize)
  }
}

export const studentService = new StudentService()