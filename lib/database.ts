import { drizzle } from 'drizzle-orm/d1'
import { sql } from 'drizzle-orm'

// Database schema
export const projectsTable = {
  id: 'text primary key',
  name: 'text not null',
  description: 'text',
  type: 'text not null',
  status: 'text not null default "initializing"',
  created_at: 'integer not null default (strftime("%s", "now"))',
  updated_at: 'integer not null default (strftime("%s", "now"))',
  owner: 'text not null',
  metadata: 'text default "{}"'
}

export const filesTable = {
  id: 'text primary key',
  project_id: 'text not null',
  path: 'text not null',
  name: 'text not null',
  type: 'text not null',
  content: 'text not null',
  size: 'integer not null default 0',
  last_modified: 'integer not null default (strftime("%s", "now"))',
  is_generated: 'integer not null default 0',
  generated_by: 'text'
}

export const chatMessagesTable = {
  id: 'text primary key',
  project_id: 'text',
  role: 'text not null',
  content: 'text not null',
  model: 'text',
  agent_id: 'text',
  timestamp: 'integer not null default (strftime("%s", "now"))',
  metadata: 'text default "{}"'
}

export const agentsTable = {
  id: 'text primary key',
  name: 'text not null',
  type: 'text not null',
  description: 'text not null',
  capabilities: 'text not null',
  status: 'text not null default "idle"',
  current_task: 'text',
  performance: 'text default "{}"',
  tools: 'text default "[]"',
  model: 'text',
  created_at: 'integer not null default (strftime("%s", "now"))',
  updated_at: 'integer not null default (strftime("%s", "now"))'
}

// Database initialization
export async function initDatabase(db: any) {
  try {
    // Create projects table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'initializing',
        created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
        updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
        owner TEXT NOT NULL,
        metadata TEXT DEFAULT '{}'
      )
    `)

    // Create files table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS files (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        path TEXT NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        content TEXT NOT NULL,
        size INTEGER NOT NULL DEFAULT 0,
        last_modified INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
        is_generated INTEGER NOT NULL DEFAULT 0,
        generated_by TEXT,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
      )
    `)

    // Create chat messages table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id TEXT PRIMARY KEY,
        project_id TEXT,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        model TEXT,
        agent_id TEXT,
        timestamp INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
        metadata TEXT DEFAULT '{}',
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
      )
    `)

    // Create agents table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS agents (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT NOT NULL,
        capabilities TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'idle',
        current_task TEXT,
        performance TEXT DEFAULT '{}',
        tools TEXT DEFAULT '[]',
        model TEXT,
        created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
        updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
      )
    `)

    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

// Database connection helper
export function getDatabase() {
  // In development, this would connect to a local D1 instance
  // In production, this connects to your Cloudflare D1 database
  if (typeof globalThis.DB !== 'undefined') {
    return drizzle(globalThis.DB)
  }
  
  // Fallback for development
  throw new Error('Database not available. Make sure D1 is properly configured.')
}