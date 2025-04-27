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
  videoUrl?: string;

  @ApiPropertyOptional({ description: '오디오 URL', type: String })
  @IsOptional()
  @IsString()
  audioUrl?: string;

  constructor(args: { videoUrl?: string; audioUrl?: string }) {
    this.videoUrl = args.videoUrl;
    this.audioUrl = args.audioUrl;
  }
}

export class CreateSubmissionResponseDTO {
  @ApiProperty({ description: '결과 상태', example: 'ok' })
  @IsString()
  result: string;

  @ApiProperty({ description: '메시지', nullable: true })
  @IsString()
  message: string | null;

  @ApiProperty({ description: '학생 ID' })
  @IsString()
  studentId: string;

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

  constructor(args: {
    result: string;
    message: string | null;
    studentId: string;
    studentName: string;
    score: number;
    feedback: string;
    hightlights: string[];
    highlightSubmitText: string;
    mediaUrl: {
      audioUrl: string;
      videoUrl: string;
    };
  }) {
    this.result = args.result;
    this.message = args.message;
    this.studentId = args.studentId;
    this.studentName = args.studentName;
    this.score = args.score;
    this.feedback = args.feedback;
    this.highlights = args.hightlights;
    this.highlightSubmitText = args.highlightSubmitText;
    this.mediaUrl = new MediaUrlDto({ ...args.mediaUrl });
  }
}
