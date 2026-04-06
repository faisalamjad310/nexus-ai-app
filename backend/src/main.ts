import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
const sessionSecret =
  process.env.SESSION_SECRET?.trim() || 'change-this-secret';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? true,
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 14,
      },
      store: MongoStore.create({
        mongoUrl:
          process.env.MONGO_URI ??
          process.env.MONGODB_URI ??
          'mongodb://127.0.0.1:27017/nexusai',
        collectionName: 'sessions',
      }),
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NexusAI App Backend API')
    .setDescription(
      'REST API for the NexusAI app',
    )
    .setVersion('1.0.0')
    .addTag('catalog')
    .addTag('chat-hub')
    .addTag('chat')
    .addTag('agents')
    .addTag('auth')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDoc);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
