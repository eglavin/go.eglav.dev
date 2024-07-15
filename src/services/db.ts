import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import { links } from "../schemas/links.js";

export let db: ReturnType<
  typeof drizzle<{
    links: typeof links;
  }>
>;

export function initialiseDatabase() {
  const sqlite = new Database("db.sqlite");
  db = drizzle(sqlite, {
    logger: true,
    schema: {
      links,
    },
  });

  migrate(db, {
    migrationsFolder: "./migrations",
  });
}
