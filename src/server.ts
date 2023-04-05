import { app } from "./app";
import { env } from "./env";
import { movieRoutes } from "./routes";

movieRoutes(app);

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(`Running on port ${env.PORT}`);
  });
