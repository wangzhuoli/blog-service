import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let errorMessage = exception.message;
    const exceptionResponse = exception.getResponse() as any;

    console.log(exceptionResponse);

    if (exceptionResponse?.message) {
      if (Array.isArray(exceptionResponse.message)) {
        // 存在ValidationPipe校验的错误，捕获第一个错误信息返回
        errorMessage = exceptionResponse.message[0];
      }
      if (typeof exceptionResponse.message === 'string') {
        // 存在ValidationPipe校验的错误，捕获第一个错误信息返回
        errorMessage = exceptionResponse.message;
      }
    }

    console.log(exception.getResponse());

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = {
      success: false,
      data: null, // 获取全部的错误信息
      errorMessage,
      errorCode: status, // 自定义code
      url: request.originalUrl, // 错误的url地址
    };

    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
