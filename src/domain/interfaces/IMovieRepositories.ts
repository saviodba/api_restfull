import { Movie } from "../entities/Movie";

export interface IMovieRepositories {
  getInterval(): Promise<Movie[]>;
  getListMovies():Promise<Movie[]>;
}