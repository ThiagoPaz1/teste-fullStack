import { studentRepository } from "../repository"
import { CreateStudentDto, UpdateStudentDto } from "../dto"
import { Student } from "../types"

class StudentService {
  async create(studentData: CreateStudentDto): Promise<void> {
    await studentRepository.create(studentData)
  }

  async getAll(page: number, pageSize: number): Promise<{
    students: Student[],
    totalStudentsInPage: number,
    totalStudents: number
  }> {
    return await studentRepository.getAll(page, pageSize)
  }

  async filter(
    id: string,
    name: string,
    course: string): Promise<{ students: Student[] }> {
    return await studentRepository.filter(id, name, course)
  }

  async update(updateStudentDto: UpdateStudentDto): Promise<{ student: Student }> {
    return await studentRepository.update(updateStudentDto)
  }
}

export const studentService = new StudentService()