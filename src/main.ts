import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseExceptionFilter, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { BasicAuthSwagger } from './basic-auth-swagger';
import { HttpInterceptor } from './shared/interceptor/http-interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const appConfig = app.get<ConfigService>(ConfigService);
  app.useLogger(app.get(PinoLogger));
  app.setGlobalPrefix(appConfig.get('PREFIX_API') || 'api');
  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      enableDebugMessages: false,
    }),
  );
  // Basic Auth Swagger
  app.use(new BasicAuthSwagger().use);
  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Hotel Booking API Demo')
    .setDescription('Nestjs DDD API Hotel Booking Description')
    .setVersion('1.0')
    .addBearerAuth(
      { in: 'headers', type: 'http', name: 'JWT_ACCESS_TOKEN' },
      'JWT_ACCESS_TOKEN',
    )
    .addBearerAuth(
      { in: 'headers', type: 'http', name: 'JWT_REFRESH_TOKEN' },
      'JWT_REFRESH_TOKEN',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.set('trust proxy', 1);
  app.set('x-powered-by', false);
  app.use(helmet());
  app.useGlobalFilters(new BaseExceptionFilter());
  app.useGlobalInterceptors(new HttpInterceptor());
  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      return callback(null, true);
    },
    methods: 'GET,PATCH,POST,DELETE',
  });
  const logger = new Logger('dashboard');
  await app.listen(appConfig.get('PORT') || 3000);
  logger.log(`Application is running on : ${await app.getUrl()}`);
}
bootstrap();
