import Redis from "ioredis";

export class RedisConnection {
    private static _connection: Redis;
    public static async connect() {
        if (!this._connection) {
            this._connection = new Redis(process.env.REDIS_URL as string);
        }

        console.log("Redis is connected.");
    }
    public static get connection() {
        if (!this._connection) {
            throw new Error("Redis is not connected.");
        }

        return this._connection;
    }
    public static destroy() {
        this._connection.disconnect();
    }
}