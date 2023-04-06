import { FastifyRequest, FastifyReply } from "fastify";
import { FavoriteService } from "../services/favorite";
import { z } from "zod";
import { FavoriteDto } from "../dtos/favorite";
import { PrismaFavoriteRepository } from "../repositories/prisma/prisma-favorite-repositories";

const favoriteRepository = new PrismaFavoriteRepository();
const favoriteService = new FavoriteService(favoriteRepository);

export default {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const getMovieBody = z.object({
      id: z.string(),
      title: z.string(),
      img: z.string(),
    });

    const { id, title, img } = getMovieBody.parse(request.body as FavoriteDto);

    try {
      const response = await favoriteService.create({ id, title, img });
      reply.send(response);
    } catch (err) {
      console.error(err);
      return reply.status(409).send();
    }
  },

  async list(_: FastifyRequest, reply: FastifyReply) {
    const response = await favoriteService.list();
    reply.send(response);
  },

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
      const response = await favoriteService.delete(id as string);
      reply.send(response);
    } catch (err) {
      console.error(err);
      return reply.status(409).send();
    }
  },
};
