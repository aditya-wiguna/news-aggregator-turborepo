import { HttpModule, HttpService } from '@nestjs/axios';
import { Module, OnModuleInit } from '@nestjs/common';
import { GuardianClientService } from './services/guardian-client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from 'src/news/schemas/news.schema';
import { TheGuardianService } from './services/the-guardian.service';
import { GuardianTaskService } from './services/guardian-task.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }])
  ],
  providers: [
    GuardianClientService,
    TheGuardianService,
    GuardianTaskService
  ],
  exports: [GuardianClientService, TheGuardianService],
})
export class TheGuardianModule  {}
