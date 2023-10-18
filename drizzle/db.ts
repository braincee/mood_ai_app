import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'
import {
  analysis,
  journalEntries,
  users,
  usersRelations,
  journalEntriesRelations,
  analysisRelations,
} from './schema'

const schema = {
  users,
  journalEntries,
  analysis,
}

const config = {
  url: process.env.DATABASE_URL,
}

const connection = connect(config)

export const db = drizzle(connection, { schema })
