import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

export async function rateLimit(userId: string) {
  const result = await redis.incr(userId)
  if (result > 10) {
    throw new Error('Rate limit exceeded')
  }
  await redis.expire(userId, 60)
}