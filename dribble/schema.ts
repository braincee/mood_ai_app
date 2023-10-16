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
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable(
  'users',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    clerkId: char('clerk_id').notNull(),
    email: char('email').notNull(),
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
    content: text('content'),
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
    entryId: int('user_id').notNull(),
    userId: int('user_id').notNull(),
    mood: char('mood'),
    summary: text('summary'),
    color: char('color'),
    negative: boolean('negative'),
    subject: char('subject'),
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
