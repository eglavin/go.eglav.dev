import fp from "fastify-plugin";

import { db } from "./db.js";
import { sqids } from "./sqids.js";

export const middleware = fp(async (fastify, _options) => {
	fastify.addHook("onRequest", async (request) => {
		request.db = db;
		request.sqids = sqids;
	});
});
