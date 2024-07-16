import type { FastifyInstance } from "fastify";

export function IndexRoutes(service: FastifyInstance, _: unknown, done: () => void) {
	service.route({
		method: "GET",
		url: "/",
		handler: async (request, reply) => {
			reply
				.status(302)
				.redirect(`https://eglavin.com?from=${encodeURIComponent(request.hostname)}`);
		},
	});

	done();
}
