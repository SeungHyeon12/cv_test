import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUniqueId } from 'src/common/utils/createUniqueId.function';
import { Student } from 'src/domain/student';
import { IStudentRepository } from 'src/service/interface/studentRepository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private readonly studentRepo: IStudentRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createStudent(studentName: string) {
    await this.studentRepo.save(
      Student.createOf({
        id: createUniqueId(),
        name: studentName,
      }),
    );
  }

  // 우선 NAME 이 UNIQUE 하다고 가정을 한다.
  async generateAccessToken(userName: string) {
    const student = await this.studentRepo.findByName(userName);

    const payload = {
      sub: student.id,
      name: student.name,
    };

    return this.jwtService.sign(payload);
  }
}
