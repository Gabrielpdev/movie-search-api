import { PrismaClient } from "@prisma/client";
import { FavoriteDto } from "../dtos/favorite";

const prisma = new PrismaClient();

export const CreateFavoriteMovie = async ({ id, title, img }: FavoriteDto) => {
  try {
    await prisma.favorites.create({
      data: {
        id,
        img,
        title,
      },
    });

    return {
      message: "Movie added to favorites",
      movie: {
        id,
        img,
        title,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data from external API");
  }
};

export const ListFavoritesMovies = async () => {
  try {
    return await prisma.favorites.findMany();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to list favorites movies");
  }
};
