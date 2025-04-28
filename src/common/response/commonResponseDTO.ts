import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommonResponseDto<T> {
  @ApiProperty({ example: 'ok' })
  result: string;

  @ApiProperty({ example: '요청이 성공했습니다.' })
  message: string;

  @ApiProperty({ description: '실제 응답 데이터' })
  data: T;

  //latency 쪽에서 추가적으로 사용
  @ApiPropertyOptional({ description: 'API 응답 지연 시간(ms)', example: 123 })
  apiLatency?: number;

  constructor(args: {
    data: T;
    message?: string;
    result?: string;
    apiLatency?: number;
  }) {
    this.result = args.result ?? 'ok';
    this.message = args.message ?? 'messasge request success';
    this.data = args.data;
    if (args.apiLatency) {
      this.apiLatency = args.apiLatency;
    }
  }
}
