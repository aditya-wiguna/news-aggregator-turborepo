import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CacheService } from './services/cache.service';
import { CacheEventService } from './services/cache-event.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: configService.get<string>('REDIS_URL') || 'redis://localhost:6379/0',
      }),
    }),
  ],
  providers: [CacheService, CacheEventService],
  exports: [CacheService, CacheEventService],
})
export class CacheModule {}
