import { Student } from 'src/domain/student';

export interface IStudentRepository {
  save(student: Student): Promise<void>;
  findById(studentId: string): Promise<Student>;
  findByName(studentName: string): Promise<Student>;
}
