import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma-client";

export class PrismaFavoriteRepository {
  async create(data: Prisma.FavoritesCreateInput) {
    const movie = await prisma.favorites.create({
      data,
    });

    return movie;
  }

  async list() {
    const movie = await prisma.favorites.findMany();

    return movie;
  }

  async findById(id: string) {
    const movie = await prisma.favorites.findFirst({
      where: {
        id,
      },
    });

    return movie;
  }

  async delete(id: string) {
    await prisma.favorites.delete({
      where: {
        id,
      },
    });
  }
}
