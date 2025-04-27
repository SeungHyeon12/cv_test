import { Student } from 'src/domain/student';
import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('students')
export class StudentEntity {
  @PrimaryColumn({ type: 'char', length: 26 })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;

  constructor(student: Student) {
    if (student) {
      this.id = student.id;
      this.name = student.name;
      this.createdAt = student.createdAt;
    }
  }

  toDomain() {
    return new Student({
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
    });
  }
}
