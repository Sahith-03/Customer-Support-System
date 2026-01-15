import { config } from "dotenv"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { sql } from "drizzle-orm"

// Load .env from root directory (tsx runs from packages/db)
config({ path: "../../.env" })

console.log("DATABASE_URL loaded:", process.env.DATABASE_URL ? "Yes" : "No")

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not found in environment")
  process.exit(1)
}

// Create a fresh pool with the loaded env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const db = drizzle(pool)

async function test() {
  try {
    const dbResult = await db.execute(sql`select 1`)
    console.log("DB connected successfully!")
    console.log("Result:", dbResult)
    await pool.end()
    process.exit(0)
  } catch (error) {
    console.error("DB connection failed:", error)
    await pool.end()
    process.exit(1)
  }
}

test()
