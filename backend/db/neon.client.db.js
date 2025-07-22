import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// Create a Neon client connection
const sql = neon(`postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`);

export default sql;
