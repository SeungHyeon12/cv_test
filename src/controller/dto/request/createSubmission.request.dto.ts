import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmissionReqyestDTO {
  @ApiProperty({ description: '학생 ID', example: 123 })
  @IsNumber()
  @Type(() => Number)
  studentId: number;

  @ApiProperty({ description: '학생 이름', example: '홍길동' })
  @IsString()
  studentName: string;

  @ApiProperty({ description: '과제 유형', example: 'Essay Writing' })
  @IsString()
  componentType: string;

  @ApiProperty({ description: '제출 텍스트', example: 'Hello my name is ...' })
  @IsString()
  submitText: string;
}
