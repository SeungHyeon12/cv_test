import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LatencyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now(); // 요청 시작 시점

    return next.handle().pipe(
      map((data) => {
        const latencyMilSecs = Date.now() - now;

        return {
          ...data,
          apiLatency: latencyMilSecs,
        };
      }),
    );
  }
}
