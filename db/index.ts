/**
 * Neon-http doesn't support transaction. So we use Neon
 * serverless because it supports and this project gonna
 * be deployed in serverless environments, like Vercel.
 */
import { drizzle } from 'drizzle-orm/neon-serverless'; 
import { Pool } from '@neondatabase/serverless'; 

const dbUrl = process.env.DATABASE_URL

if (!dbUrl) {
  throw new Error('DATABASE_URL is not defined')
}

// Create a client connection pool that manages WebSocket tunnels natively
const pool = new Pool({ connectionString: dbUrl });
export const db = drizzle({ client: pool });
