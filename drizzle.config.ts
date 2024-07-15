import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schemas/*.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "./db.sqlite",
  },
  out: "./migrations",
  verbose: true,
  strict: true,
});
