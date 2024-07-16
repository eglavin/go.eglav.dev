import type { db } from "./services/db.ts";
import type { sqids } from "./services/sqids.ts";

declare module "fastify" {
	interface FastifyRequest {
		db: typeof db;
		sqids: typeof sqids;
	}
}
