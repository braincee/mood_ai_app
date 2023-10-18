import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'

const config = {
  url: process.env.DATABASE_URL,
}

const connection = connect(config)

export const db = drizzle(connection)
