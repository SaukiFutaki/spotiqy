# Drizzle ORM Guide

## Overview
Drizzle ORM adalah TypeScript ORM yang ringan dan type-safe untuk SQL database. Dirancang dengan fokus pada performa, type safety, dan developer experience.

## Table of Contents
- [Installation](#installation)
- [Database Support](#database-support)
- [Quick Start](#quick-start)
- [Schema Definition](#schema-definition)
- [Database Operations](#database-operations)
- [Migrations](#migrations)
- [Best Practices](#best-practices)

## Installation

```bash
# Install core dependencies
npm install drizzle-orm pg
# Install dev dependencies
npm install -D drizzle-kit @types/pg

# For MySQL
npm install drizzle-orm mysql2
npm install -D drizzle-kit

# For SQLite
npm install drizzle-orm sqlite3
npm install -D drizzle-kit
```

## Database Support
- PostgreSQL
- MySQL
- SQLite
- SQL.js
- Amazon RDS
- PlanetScale
- Neon
- Vercel Postgres

## Quick Start

```typescript
// 1. Define your schema
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  email: varchar('email', { length: 255 })
});

// 2. Setup database connection
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const db = drizzle(pool);

// 3. Perform queries
const result = await db.select().from(users);
```

## Schema Definition

### Basic Types
```typescript
import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age'),
  createdAt: timestamp('created_at').defaultNow()
});
```

### Relations
```typescript
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  authorId: integer('author_id').references(() => users.id)
});
```

## Database Operations

### Select
```typescript
// Basic select
const allUsers = await db.select().from(users);

// Select with conditions
const filteredUsers = await db
  .select()
  .from(users)
  .where(eq(users.age, 25));

// Select with join
const usersWithPosts = await db
  .select()
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId));
```

### Insert
```typescript
// Single insert
const newUser = await db
  .insert(users)
  .values({
    name: 'John',
    email: 'john@example.com'
  })
  .returning();

// Batch insert
const newUsers = await db
  .insert(users)
  .values([
    { name: 'John', email: 'john@example.com' },
    { name: 'Jane', email: 'jane@example.com' }
  ]);
```

### Update
```typescript
const updated = await db
  .update(users)
  .set({ name: 'Jane' })
  .where(eq(users.id, 1))
  .returning();
```

### Delete
```typescript
const deleted = await db
  .delete(users)
  .where(eq(users.id, 1));
```

## Migrations

### Generate Migrations
```bash
# Generate migration files
npx drizzle-kit generate:pg

# Push migrations to database
npx drizzle-kit push:pg
```

### Run Migrations
```typescript
import { migrate } from 'drizzle-orm/node-postgres/migrator';

await migrate(db, { migrationsFolder: './drizzle' });
```

## Best Practices

### 1. Environment Configuration
```typescript
// config/database.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
});

export const db = drizzle(pool);
```

### 2. Repository Pattern
```typescript
// repositories/userRepository.ts
export class UserRepository {
  constructor(private db: PostgresJsDatabase) {}

  async findById(id: number) {
    return await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
  }
}
```

### 3. Transaction Usage
```typescript
await db.transaction(async (tx) => {
  await tx.insert(users).values({ name: 'John' });
  await tx.insert(posts).values({ authorId: 1 });
});
```

## Additional Features

### 1. Type Safety
- Full TypeScript support
- Inferred types from schema
- Compile-time type checking

### 2. Performance
- Minimal overhead
- Efficient query building
- Connection pooling

### 3. Developer Tools
- Schema introspection
- Migration management
- Query debugging

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT License