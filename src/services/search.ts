import axios from "axios";

import { env } from "../env";
import { IMovieDto, MovieDto } from "../dtos/movie";
import { Prisma, PrismaClient } from "@prisma/client";
import { URLSearchParams } from "url";

const prisma = new PrismaClient();

export interface IMoviesServices {
  i?: string;
  t?: string;
  y?: string;
  plot?: string;
  type?: string;
}

export const moviesServices = async (params: IMoviesServices) => {
  try {
    const { data } = await axios.get(
      `${env.API_URL}/?apikey=${env.API_KEY}&plot=${
        params?.plot ?? "full"
      }&type=${params?.type ?? "movie"}&${new URLSearchParams({ ...params })}`
    );

    const movieDto: IMovieDto = new MovieDto(
      data.imdbID,
      data.Title,
      data.Poster,
      data.Year,
      data.imdbRating,
      data.Plot,
      data.Genre,
      data.Language,
      data.Country,
      data.Writer,
      data.Runtime,
      data.Actors,
      data.Realeased,
      data.Awards
    );

    const isFavorite = await prisma.favorites.findUnique({
      where: {
        id: movieDto.imdbID,
      },
    });

    return {
      ...movieDto,
      isFavorite: !!isFavorite,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error("Failed to fetch favorite movies from database");
    } else {
      throw new Error(`${error}`);
    }
  }
};
