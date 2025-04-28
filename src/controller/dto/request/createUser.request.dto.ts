import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ description: '유저 이름', example: 'test' })
  @IsString()
  name: string;
}
