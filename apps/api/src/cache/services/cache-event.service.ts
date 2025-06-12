import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import Redis from "ioredis";

@Injectable()
export class CacheEventService {
  private readonly logger = new Logger(CacheEventService.name);

  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  @OnEvent('destroy.cache')
  async destroyCache(
    cacheKey: string
  ): Promise<void> {
    try {
      if (cacheKey.includes('*')) {
        await this.deleteByPattern(cacheKey);
      } else {
        await this.redis.del(cacheKey);
        this.logger.debug(`Deleted cache key: ${cacheKey}`);
      }
    } catch (error) {
      this.logger.error(`Error deleting cache key "${cacheKey}": ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Delete all keys matching a pattern
   * @param pattern Pattern to match (e.g., "user:*" or "post:123:*")
   */
  private async deleteByPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);

      if (keys.length === 0) {
        this.logger.debug(`No keys found matching pattern: ${pattern}`);
        return;
      }

      const pipeline = this.redis.pipeline();

      for (const key of keys) {
        pipeline.del(key);
      }

      await pipeline.exec();
      this.logger.debug(`Deleted ${keys.length} keys matching pattern: ${pattern}`);
    } catch (error) {
      this.logger.error(`Error deleting pattern "${pattern}": ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

}
