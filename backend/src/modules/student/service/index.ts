import { studentRepository } from "../repository"
import { CreateStudentDto } from "../dto/create-student.dto"

class StudentService {
  async create(studentData: CreateStudentDto): Promise<void> {
    await studentRepository.create(studentData)
  }
}

export const studentService = new StudentService()