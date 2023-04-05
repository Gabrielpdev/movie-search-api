import { FastifyRequest, FastifyReply } from "fastify";
import {
  CreateFavoriteMovie,
  ListFavoritesMovies,
  RemoveFavoritesMovies,
} from "../services/favorite";
import { z } from "zod";
import { FavoriteDto } from "../dtos/favorite";

export default {
  // const response = await FavoriteService(request);
  // reply.send(response);

  async create(request: FastifyRequest, reply: FastifyReply) {
    const getMovieBody = z.object({
      id: z.string(),
      title: z.string(),
      img: z.string(),
    });

    const { id, title, img } = getMovieBody.parse(request.body as FavoriteDto);

    const response = await CreateFavoriteMovie({ id, title, img });
    reply.send(response);
  },

  async list(_: FastifyRequest, reply: FastifyReply) {
    const response = await ListFavoritesMovies();
    reply.send(response);
  },

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const response = await RemoveFavoritesMovies(request.params.id as string);
    reply.send(response);
  },
};
