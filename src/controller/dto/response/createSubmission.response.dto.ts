import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class MediaUrlDto {
  @ApiPropertyOptional({ description: '비디오 URL', type: String })
  @IsOptional()
  @IsString()
  video?: string;

  @ApiPropertyOptional({ description: '오디오 URL', type: String })
  @IsOptional()
  @IsString()
  audio?: string;
}

export class CreateSubmissionResponseDTO {
  @ApiProperty({ description: '결과 상태', example: 'ok' })
  @IsString()
  result: string;

  @ApiProperty({ description: '메시지', nullable: true })
  @IsString()
  message: string | null;

  @ApiProperty({ description: '학생 ID' })
  @IsNumber()
  studentId: number;

  @ApiProperty({ description: '학생 이름' })
  @IsString()
  studentName: string;

  @ApiPropertyOptional({ description: '점수' })
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiPropertyOptional({ description: '피드백' })
  @IsOptional()
  @IsString()
  feedback?: string;

  @ApiPropertyOptional({ description: '하이라이트 문장 목록', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[];

  @ApiPropertyOptional({ description: '제출 텍스트' })
  @IsOptional()
  @IsString()
  submitText?: string;

  @ApiPropertyOptional({ description: '하이라이트된 제출 텍스트' })
  @IsOptional()
  @IsString()
  highlightSubmitText?: string;

  @ApiPropertyOptional({ description: '미디어 URL' })
  @IsOptional()
  @ValidateNested()
  @Type(() => MediaUrlDto)
  mediaUrl?: MediaUrlDto;

  @ApiProperty({ description: 'API 지연 시간 (ms)' })
  @IsOptional()
  apiLatency: number;
}
