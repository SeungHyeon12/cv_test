import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommonResponseDto } from 'src/common/response/commonResponseDTO';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('exception : ', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const startTime = request._startAt || Date.now();
    const latency = Date.now() - startTime;

    // error 가 나더라도 항상 코드는 200
    const status = HttpStatus.OK;

    let message: any;
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      message = typeof response === 'string' ? { message: response } : response;
    } else {
      message = { message: 'Internal server error' };
    }

    response.status(status).json(
      new CommonResponseDto<null>({
        result: 'falied',
        message,
        data: null,
        apiLatency: latency,
      }),
    );
  }
}
