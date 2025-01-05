import { Movie } from "../entities/Movie";

export interface IMovieRepositories {
  get(): Promise<Movie[]>;
}