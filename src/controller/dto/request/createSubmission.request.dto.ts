import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ComponentType } from 'src/domain/vo/enum/componentType.enum';

export class CreateSubmissionReqyestDTO {
  @ApiProperty({
    description: '과제 유형',
    enum: ComponentType,
    example: ComponentType.ESSAY_WRITING,
  })
  @IsEnum(ComponentType)
  componentType: ComponentType;

  @ApiProperty({ description: '제출 텍스트', example: 'Hello my name is ...' })
  @IsString()
  submitText: string;

  @ApiProperty({
    description: '제출 영상 파일',
    type: 'string',
    format: 'binary',
  })
  videoFile: any;
}
