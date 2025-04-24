import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  @ApiPropertyOptional({
    description: '제출 영상 파일 (form-data)',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  videoFile?: any; // 실제 파일은 Multipart 처리 시 Multer로 별도 분리됨
}
