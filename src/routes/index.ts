import { FastifyInstance } from "fastify";

import { SearchController } from "../controller/search";
import FavoritesController from "../controller/favorite";

export async function movieRoutes(app: FastifyInstance) {
  app.get("/movies", SearchController);

  app.get("/favorites", FavoritesController.list);
  app.post("/favorite", FavoritesController.create);
}
