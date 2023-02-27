import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../../logger/logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
  ) {
    const logLevels = this.configService.get('LOG_LEVELS').split(',');
    this.loggerService.setContext('LoggingInterceptor');
    this.loggerService.setLogLevels(logLevels);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    this.loggerService.log({
      message: `${request.method}${request.url} request received`,
      query: request.query,
      body: request.body,
    });

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        this.loggerService.log({
          status: response.statusCode,
          message: `${request.method}${request.url} response returned`,
        });
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        this.loggerService.error({
          status: response.statusCode,
          message: error.message,
        });
        return throwError(error);
      }),
    );
  }
}
