import { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config({
  path: '.env.local',
})

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/schena-out.ts',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  driver: 'mysql2',
} satisfies Config
