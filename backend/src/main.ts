import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import session from 'express-session';
import MongoStore from 'connect-mongo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? true,
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? 'change-this-secret',
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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NexusAI App Backend API')
    .setDescription('APIs')
    .setVersion('1.0.0')
    .addTag('catalog')
    .addTag('NexusAI')
    .addTag('auth')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDoc);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
