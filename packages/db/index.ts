import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

let pool: Pool | null = null
let dbInstance: ReturnType<typeof drizzle> | null = null

export function getDb() {
  if (!dbInstance) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set")
    }
    
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
    
    dbInstance = drizzle(pool)
  }
  
  return dbInstance
}

// Export db as a getter for convenience
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>]
  }
})

export * from './schema/conversations.js'
export * from './schema/messages.js'
export * from './schema/orders.js'
export * from './schema/payments.js'
