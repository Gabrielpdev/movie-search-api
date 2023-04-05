export interface IMovieDto {
  imdbID: string;
  title: string;
  poster: string;
  year: string;
  imdbRating: string;
  plot: string;
  genre: string;
  language: string;
  country: string;
  writer: string;
  runtime: string;
  actors: string;
  released: string;
  awards: string;
}

export class MovieDto {
  constructor(
    public imdbID: string,
    public title: string,
    public poster: string,
    public year: string,
    public imdbRating: string,
    public plot: string,
    public genre: string,
    public language: string,
    public country: string,
    public writer: string,
    public runtime: string,
    public actors: string,
    public released: string,
    public awards: string
  ) {}
}
