import { relations } from 'drizzle-orm'
import {
  boolean,
  char,
  datetime,
  float,
  index,
  int,
  mysqlTable,
  text,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable(
  'users',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    clerkId: varchar('clerk_id', { length: 225 }).notNull(),
    email: varchar('email', { length: 225 }).notNull(),
    createdAt: datetime('created_at'),
    updatedAt: datetime('updated_at'),
  },
  (table) => {
    return {
      clerkId: uniqueIndex('clerk_id').on(table.clerkId),
      email: uniqueIndex('email').on(table.email),
    }
  }
)

export const journalEntries = mysqlTable(
  'journal_entries',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    userId: int('user_id').notNull(),
    content: text('content').notNull(),
    createdAt: datetime('created_at'),
    updatedAt: datetime('updated_at'),
  },
  (table) => {
    return {
      id: uniqueIndex('id').on(table.id),
      userId: uniqueIndex('user_id').on(table.userId),
      userIdIdx: index('user_id_idx').on(table.userId),
    }
  }
)

export const analysis = mysqlTable(
  'analysis',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    userId: int('user_id').notNull(),
    entryId: int('entry_id').notNull(),
    mood: varchar('mood', { length: 225 }),
    summary: text('summary'),
    color: varchar('color', { length: 225 }),
    negative: boolean('negative'),
    subject: varchar('subject', { length: 225 }),
    sentimentScore: float('sentimentScore').default(0),
    createdAt: datetime('created_at'),
    updatedAt: datetime('updated_at'),
  },
  (table) => {
    return {
      entryId: uniqueIndex('entry_id').on(table.entryId),
      userIdIdx: index('user_id_idx').on(table.userId),
      entryIdIdx: index('entry_id_idx').on(table.entryId),
    }
  }
)

export const usersRelations = relations(users, ({ many }) => ({
  journalEntries: many(journalEntries),
}))

export const journalEntriesRelations = relations(journalEntries, ({ one }) => ({
  user: one(users, {
    fields: [journalEntries.userId],
    references: [users.id],
  }),
}))

export const analysisRelations = relations(analysis, ({ one }) => ({
  user: one(users, {
    fields: [analysis.userId],
    references: [users.id],
  }),
  entry: one(journalEntries, {
    fields: [analysis.entryId],
    references: [journalEntries.id],
  }),
}))
