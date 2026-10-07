import pg from 'pg'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

// load the .env that sits next to this file, no matter where node is run from
dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)) })

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
      rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)