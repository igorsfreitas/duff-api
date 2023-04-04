import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const result: { [key: string]: any } = {};

    result['statusCode'] = status;
    result['message'] = exception;
    result['path'] = request.url;
    result['method'] = request.method;
    result['timestamp'] = new Date().toISOString();

    if (exception instanceof HttpException)
      result['message'] = exception.message;

    if (exception instanceof UnprocessableEntityException) {
      result['message'] = exception['response'].error;
      result['validation'] = exception['response'].message?.filter(
        (text) => !!text,
      );
    }

    return response.status(result['statusCode']).json(result);
  }
}
