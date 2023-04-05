import { FastifyRequest, FastifyReply } from "fastify";
import { IMoviesServices, moviesServices } from "../services/search";
import { z } from "zod";

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

  const queryParams = getMovieQuery.parse(request.query as IMoviesServices);

  const params = Object.fromEntries(
    Object.entries(queryParams).filter(([_, value]) => value !== undefined)
  );

  const response = await moviesServices(params);
  reply.send(response);
};
