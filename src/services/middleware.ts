import fp from "fastify-plugin";

import { sqids } from "./sqids.js";
import { db } from "./db.js";

export const middleware = fp(async (fastify, _options) => {
  fastify.addHook("onRequest", async (request) => {
    request.db = db;
    request.sqids = sqids;
  });
});
