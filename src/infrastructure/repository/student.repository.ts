import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { StudentEntity } from 'src/infrastructure/repository/entities/student.entity';
import { Student } from 'src/domain/student';
import { IStudentRepository } from 'src/service/interface/studentRepository.interface';

@Injectable()
export class StudentRepository implements IStudentRepository {
  constructor(
    @Inject('CV_DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async save(student: Student): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(StudentEntity)
      .values({ ...student })
      .execute();
  }

  async findById(studentId: string): Promise<Student> {
    const entity = await this.dataSource
      .createQueryBuilder(StudentEntity, 'students')
      .where('students.id = :studentId', {
        studentId,
      })
      .getOne();

    return entity.toDomain();
  }

  async findByName(studentName: string): Promise<Student> {
    const entity = await this.dataSource
      .createQueryBuilder(StudentEntity, 'students')
      .where('students.name = :studentName', {
        studentName,
      })
      .getOne();

    return entity.toDomain();
  }
}
