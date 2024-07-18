import Fastify from "fastify";

import { IndexRoutes } from "./routes/index.js";
import { LinkRoutes } from "./routes/link.js";
import { initialiseDatabase } from "./services/db.js";
import { middleware } from "./services/middleware.js";

async function createService() {
	const service = Fastify({
		logger: {
			transport: {
				target: "pino-pretty",
				options: {
					translateTime: "yyyy-mm-dd HH:MM:ss Z",
					ignore: "pid,hostname",
				},
			},
		},
	});

	initialiseDatabase();
	service.register(middleware);

	service.register(IndexRoutes);
	service.register(LinkRoutes);

	try {
		await service.listen({
			host: "0.0.0.0",
			port: 3000,
		});
	} catch (err) {
		service.log.error(err);
		process.exit(1);
	}
}

createService();
