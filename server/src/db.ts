import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env');
}

// `sql` est une fonction tag de template : sql`SELECT * FROM contacts`
const sql = neon(process.env.DATABASE_URL);

export default sql;
