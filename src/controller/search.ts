import { FastifyRequest, FastifyReply } from "fastify";
import { IMoviesServices, MovieService } from "../services/search";
import { z } from "zod";
import { PrismaFavoriteRepository } from "../repositories/prisma/prisma-favorite-repositories";

const favoriteRepository = new PrismaFavoriteRepository();
const movieService = new MovieService(favoriteRepository);

export const SearchController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getMovieQuery = z.object({
    i: z.string().optional(),
    t: z.string().optional(),
    y: z.string().optional(),
    plot: z.enum(["short", "full"]).optional(),
    type: z.enum(["movie", "serie", "episode"]).optional(),
  });

  const queryParams = {
    plot: "full",
    type: "movie",
    ...getMovieQuery.parse(request.query as IMoviesServices),
  };

  const params = Object.fromEntries(
    Object.entries(queryParams).filter(([_, value]) => value !== undefined)
  );

  try {
    const response = await movieService.execute(params);
    reply.send(response);
  } catch (err) {
    console.error(err);
    return reply.status(409).send();
  }
};
