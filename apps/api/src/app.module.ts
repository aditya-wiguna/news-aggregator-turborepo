import { Module } from '@nestjs/common';
import { TheGuardianModule } from './the-guardian/the-guardian.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { NewsModule } from './news/news.module';
import { CacheModule } from './cache/cache.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '../../.env'), // Path to root .env file
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI || 'mongodb://localhost:27017/news-aggregator'),
    ScheduleModule.forRoot(),
    TheGuardianModule,
    NewsModule,
    CacheModule
  ],
  controllers: [AppController]
})
export class AppModule {}
