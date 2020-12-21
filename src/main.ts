import {
  BadRequestException,
  HttpStatus,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const port = process.env.PORT;
  // const serverConfig = serverConfig

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: { value: false, target: false },
      disableErrorMessages: true,
      transform: true,
      exceptionFactory: (error) => {
        const errors = {};

        error.forEach((err) => ([errors[err.property]] = error));

        throw new BadRequestException({
          ...errors,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      },
    }),
  );
  await app.listen(port);
  logger.log(`App is listenning port ${port}`);
}
bootstrap();
