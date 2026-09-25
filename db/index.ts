/**
 * Neon-http doesn't support transaction. So we use Neon
 * serverless because it supports and this project gonna
 * be deployed in serverless environments, like Vercel.
 */
import { drizzle } from 'drizzle-orm/neon-serverless'; 
import { Pool } from '@neondatabase/serverless'; 

const dbUrl = process.env.DATABASE_URL

if (!dbUrl) throw new Error('DATABASE_URL is not defined')

/**
 * After switching to Pool driver, NextJS HMR makes every 
 * save instantiates a brand new pool of network connections 
 * without closing the old ones in development mode.
 * 
 * We cache the pool instance with globalThis from Node so
 * it uses the cache instead of renew.
 */ 
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const pool = globalForDb.conn ?? new Pool({ connectionString: dbUrl }); // Create a client connection pool that manages WebSocket tunnels natively

if (process.env.NODE_ENV !== 'production') globalForDb.conn = pool;

export const db = drizzle({ client: pool });
