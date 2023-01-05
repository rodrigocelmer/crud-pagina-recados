import { RedisConnection } from "../../../../main/database/redis-connection";


export class CacheRepository {
    private redis = RedisConnection.connection;
    public async set(key: string, value: any) {
        await this.redis.setex(key, 5 * 60, JSON.stringify(value));
    }

    public async delete(key: string) {
        return await this.redis.del(key);
    }

    public async flush() {
        return this.redis.flushall();
    }
}