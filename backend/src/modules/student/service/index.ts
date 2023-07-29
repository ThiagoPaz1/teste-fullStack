import { studentRepository } from "../repository"
import { CreateStudentDto } from "../dto/create-student.dto"
import { Student } from "../types"

class StudentService {
  async create(studentData: CreateStudentDto): Promise<void> {
    await studentRepository.create(studentData)
  }

  async getAll(): Promise<Student[]> {
    return await studentRepository.getAll()
  }
}

export const studentService = new StudentService()