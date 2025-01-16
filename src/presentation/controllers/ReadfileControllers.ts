import { GetMoviesUseCase } from "@/application/use-cases/GetMoviesUseCase";
import { AwardStatsDTO } from "@/domain/dto/ProducerDTO";
import { GetMovieIntervalUseCase } from "../../application/use-cases/getMovieIntervalUseCase";
import { MovieDao } from "../../infrastructure/database/MovieDao";

export class ReadfileControllers {
  private getMovieIntervalUseCase: GetMovieIntervalUseCase
  private getMovieUseCase:GetMoviesUseCase

  constructor() {
    this.getMovieIntervalUseCase = new GetMovieIntervalUseCase(new MovieDao())
    this.getMovieUseCase = new GetMoviesUseCase(new MovieDao())
  } 

  async getMovieInterval(): Promise<AwardStatsDTO> {
    return await this.getMovieIntervalUseCase.execute()
  }

  async getListMovies(): Promise<any> {
    return await this.getMovieUseCase.execute()
  }

}