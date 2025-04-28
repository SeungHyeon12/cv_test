import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IssueAccessTokenResponseDTO {
  @ApiProperty({ description: 'accessToken', type: String })
  @IsString()
  accessToken: string;

  constructor(args: { accessToken: string }) {
    this.accessToken = args.accessToken;
  }
}
