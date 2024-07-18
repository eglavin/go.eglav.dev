import { eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

import { links } from "../schemas/links.js";

export function LinkRoutes(service: FastifyInstance, _: unknown, done: () => void) {
	service.route({
		method: "GET",
		url: "/:id",
		handler: async (request, reply) => {
			const params = z.object({ id: z.string().min(1) }).safeParse(request.params);

			if (params.success) {
				const [id] = request.sqids.decode(params.data.id);

				const result = await request.db.select().from(links).where(eq(links.id, id));

				if (result.length === 1) {
					return reply.status(302).redirect(result[0].url);
				}
			}

			return reply
				.status(302)
				.redirect(
					`https://eglavin.com?from=${encodeURIComponent(
						`${request.hostname}/${request.url}`,
					)}`,
				);
		},
	});

	service.route({
		method: "POST",
		url: "/api/get",
		handler: async (request, reply) => {
			const body = z.object({ id: z.number() }).safeParse(request.body);

			if (body.success) {
				const result = await request.db
					.select()
					.from(links)
					.where(eq(links.id, body.data.id));

				if (result.length === 1) {
					const path = request.sqids.encode([result[0].id]);

					return reply.status(200).send(`Squid: ${path} for ${result[0].url}`);
				}
			}

			return reply.status(400).send("Invalid request");
		},
	});

	service.route({
		method: "POST",
		url: "/api/create",
		handler: async (request, reply) => {
			const body = z.object({ url: z.string().min(1).url() }).safeParse(request.body);

			if (body.success) {
				const exists = await request.db
					.select()
					.from(links)
					.where(eq(links.url, body.data.url));

				if (!exists.length) {
					const result = await request.db.insert(links).values({
						url: body.data.url,
					});

					const path = request.sqids.encode([result.lastInsertRowid as number]);

					return reply.status(201).send(`Generated squid: ${path} for ${body.data.url}`);
				}
			}

			return reply.status(400).send("Invalid request");
		},
	});

	service.route({
		method: "PUT",
		url: "/api/update",
		handler: async (request, reply) => {
			const body = z
				.object({ id: z.number(), url: z.string().min(1).url() })
				.safeParse(request.body);

			if (body.success) {
				const exists = await request.db
					.select()
					.from(links)
					.where(eq(links.id, body.data.id));

				if (exists.length) {
					const result = await request.db
						.update(links)
						.set({ url: body.data.url })
						.where(eq(links.id, body.data.id));

					const path = request.sqids.encode([body.data.id]);

					return reply.status(200).send(`Updated squid: ${path} to ${body.data.url}`);
				}
			}

			return reply.status(400).send("Invalid request");
		},
	});

	service.route({
		method: "DELETE",
		url: "/api/delete",
		handler: async (request, reply) => {
			const body = z.object({ id: z.number() }).safeParse(request.body);

			if (body.success) {
				const exists = await request.db
					.select()
					.from(links)
					.where(eq(links.id, body.data.id));

				if (exists.length) {
					const result = await request.db.delete(links).where(eq(links.id, body.data.id));

					return reply.status(200).send("Deleted");
				}
			}

			return reply.status(400).send("Invalid request");
		},
	});

	done();
}
