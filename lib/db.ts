import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || ""

if (!url) {
  console.warn("⚠️ DATABASE_URL is missing - add it to .env.local and Vercel env")
}

export const sql = url ? neon(url) : new Proxy(
  () => { throw new Error("DATABASE_URL missing") },
  {
    get: () => async () => {
      throw new Error("DATABASE_URL missing - check .env.local")
    },
    apply: () => {
      throw new Error("DATABASE_URL missing - check .env.local")
    }
  }
) as any