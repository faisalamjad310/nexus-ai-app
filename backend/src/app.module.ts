import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from './catalog/catalog.module';
import { ChatHubModule } from './chat-hub/chat-hub.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/nexusai',
    ),
    CatalogModule,
    ChatHubModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
