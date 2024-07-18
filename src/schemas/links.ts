import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const links = sqliteTable("links", {
	id: integer("id").primaryKey(),
	url: text("url").notNull(),
	created: text("created").default(sql`(current_timestamp)`),
	updated: text("updated")
		.default(sql`(current_timestamp)`)
		.$onUpdate(() => sql`(current_timestamp)`),
});
