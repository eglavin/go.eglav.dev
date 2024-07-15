import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const links = sqliteTable("links", {
  id: integer("id").primaryKey(),
  url: text("url").notNull(),
  timestamp: text("timestamp")
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
});
