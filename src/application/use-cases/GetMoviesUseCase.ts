import { IMovieRepositories } from "@/domain/interfaces/IMovieRepositories";

export class GetMoviesUseCase {
    constructor(private _movieRepositorie:IMovieRepositories) {}
  
    async execute(): Promise<any> {
      const movies = this._movieRepositorie.getListMovies()
      return movies
    }
}