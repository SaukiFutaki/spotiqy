import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';

config({ path: '.env' });

export default defineConfig({
    schema :"./lib/db/schema.ts",
    dialect : "turso",
    dbCredentials: {
        url: process.env.TURSO_CONNECTION_URL ?? "" ,
        authToken: process.env.TURSO_AUTH_TOKEN ?? "",
      },
    verbose : true,
    strict : true,
});