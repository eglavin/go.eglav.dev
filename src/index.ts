import Fastify from "fastify";

import { IndexRoutes } from "./routes/index.js";
import { LinkRoutes } from "./routes/link.js";
import { initialiseDatabase } from "./services/db.js";
import { middleware } from "./services/middleware.js";

const app = Fastify({
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
app.register(middleware);

app.register(IndexRoutes);
app.register(LinkRoutes);

// Only start the server if this file is the entrypoint.
if (import.meta.url.endsWith(process.argv[1])) {
	app
		.listen({
			host: "0.0.0.0",
			port: 3000,
		})
		.catch((err) => {
			app.log.error(err);
			process.exit(1);
		});
}

export default app;
