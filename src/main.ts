import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // 白名单列表，自动校验传入参数
      whitelist: true,
      // 自动转换数据类型
      transform: true,
      // 传入非定义的字段时抛出错误
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
