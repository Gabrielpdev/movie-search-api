import axios from "axios";

import { env } from "../env";
import { IMovieDto, MovieDto } from "../dtos/movie";
import { URLSearchParams } from "url";
import { FavoriteRepository } from "../repositories/favorite-repository";

export interface IMoviesServices {
  i?: string;
  t?: string;
  y?: string;
  plot?: string;
  type?: string;
}

export class MovieService {
  constructor(private movieRepository: FavoriteRepository) {}

  async execute(params: IMoviesServices) {
    const { data } = await axios.get(
      `${env.API_URL}/?apikey=${env.API_KEY}&${new URLSearchParams({
        ...params,
      })}`
    );

    if (data.Response === "False") {
      throw new Error("Movie not found");
    }

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

    const isFavorite = this.movieRepository.findById(movieDto.imdbID);

    return {
      ...movieDto,
      isFavorite: !!isFavorite,
    };
  }
}
