import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IssueAccessTokenRequestDTO {
  @ApiProperty({ description: '유저 이름', example: 'test' })
  @IsString()
  userName: string;
}
