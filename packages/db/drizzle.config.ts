import type { Config } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/ai_support";

export default {
  schema: "./schema/*",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
} satisfies Config;
