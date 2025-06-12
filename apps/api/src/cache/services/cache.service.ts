import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async get(key: string): Promise<string | undefined> {
    const value = await this.redis.get(key);

    if (value) {
      return value;
    }

    return undefined;
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.redis.set(
      key,
      value,
      'EX',
      ttl ? ttl : 60 * 60 * 24
    );
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async reset(): Promise<void> {
    await this.redis.reset();
  }

  async keys(pattern: string): Promise<string[]> {
    const keys = await this.redis.keys(pattern);

    return keys;
  }

  async hget(key: string, field: string): Promise<string | undefined> {
    const value = await this.redis.hget(key, field);

    if (value) {
      return value;
    }

    return undefined;
  }

  async hlen(key: string): Promise<number> {
    const length = await this.redis.hlen(key);

    return length;
  }

  async hgetall(key: string): Promise<any> {
    const value = await this.redis.hgetall(key);

    if (value) {
      return value;
    }

    return undefined;
  }

  async hincrby(key: string, field: string, increment: number): Promise<number> {
    const value = await this.redis.hincrby(key, field, increment);

    return value;
  }

  async incr(key: string): Promise<number> {
    const value = await this.redis.incr(key);

    return value;
  }

  async expire(key: string, ttl: number): Promise<void> {
    await this.redis.expire(key, ttl);
  }

  async delByPattern(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}
