const Redis = require('ioredis');

let redisClient;

const getRedisClient = () => {
    if (redisClient === undefined) {
        redisClient = new Redis(process.env.REDIS_URL);
        redisClient.on('error', (err) => {
            console.error('[ioredis] Redis error:', err);
        });
        redisClient.on('connect', () => {
            console.log('Connected to Redis');
        });
        redisClient.on('ready', async () => {
            console.log('Redis client ready');
        });
        redisClient.on('end', () => {
            console.log('Redis connection closed');
        });
    }
    return redisClient;
};

module.exports = {
    getRedisClient
};