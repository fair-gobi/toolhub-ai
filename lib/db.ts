import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL

if (!url) {
  throw new Error('DATABASE_URL missing in Vercel env')
}

export const sql = neon(url)
