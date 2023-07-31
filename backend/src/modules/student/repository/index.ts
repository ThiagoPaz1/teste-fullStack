import { v4 as uuidv4 } from "uuid"

import { CreateStudentDto, UpdateStudentDto } from "../dto"
import { sessionDB } from "../../../database/connect"
import { Student } from "../types"

class StudentRepository {
  async create(createStudentDto: CreateStudentDto): Promise<void> {
    const query = "CREATE (s:Student {id : $id, name: $name, course: $course})"
    const datas = {
      id: uuidv4(),
      name: createStudentDto.name,
      course: createStudentDto.course
    }

    await sessionDB.run(query, datas)
  }

  async getAll(page: number, pageSize: number): Promise<{
    students: Student[],
    totalStudentsInPage: number,
    totalStudents: number
  }> {
    const queryCount = "MATCH (s:Student) RETURN COUNT(s) AS count"
    const query = `MATCH (s:Student) RETURN s SKIP ${page} LIMIT ${pageSize}`
    const totalStudentsData = await sessionDB.run(queryCount)
    const studentsData = await sessionDB.run(query)
    const totalStudents = totalStudentsData.records[0].get("count")
    const students: Student[] = studentsData.records.map(i => i.get("s").properties)

    return {
      totalStudents: Number(totalStudents),
      totalStudentsInPage: students.length,
      students
    }
  }

  async filter(
    id: string,
    name: string,
    course: string): Promise<{ students: Student[] }> {
    const queryGetById = `MATCH (s:Student {id : '${id}'}) RETURN s`
    const queryGetByName = `MATCH (s:Student {name : '${name}'}) RETURN s`
    const queryGetByCourse = `MATCH (s:Student {course : '${course}'}) RETURN s`
    const queryGetByNameAndCourse = `MATCH (s:Student) WHERE s.name = '${name}' AND s.course = '${course}' RETURN s`

    async function getStudentData(query: string): Promise<{ students: Student[] }> {
      const studentsData = await sessionDB.run(query)
      const students = studentsData.records.map(i => i.get("s").properties)

      return { students }
    }

    if (name && course) {
      const studentsData = await sessionDB.run(queryGetByNameAndCourse)
      const students = studentsData.records.map(i => i.get("s").properties)

      return { students }
    }

    if (id) {
      return getStudentData(queryGetById)
    }

    if (name) {
      return getStudentData(queryGetByName)
    }

    if (course) {
      return getStudentData(queryGetByCourse)
    }

    return { students: [] }
  }

  async update(updateStudentDto: UpdateStudentDto): Promise<{ student: Student }> {
    const { id, name, course } = updateStudentDto
    const query = `MATCH (s:Student {id : '${id}'}) SET s.name= '${name}', s.course= '${course}' RETURN s`
    const result = await sessionDB.run(query)
    const studentData = result.records[0].get("s").properties

    return { student: studentData }
  }

  async delete(id: string): Promise<void> {
    const query = `MATCH (s:Student {_id : '${id}'}) DELETE s`
    await sessionDB.run(query)
  }
}

export const studentRepository = new StudentRepository()