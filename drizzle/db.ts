import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'
import * as schema from './schema'

const config = {
  url: process.env.DATABASE_URL,
}

const connection = connect(config)

export const db = drizzle(connection, { schema: { ...schema } })
