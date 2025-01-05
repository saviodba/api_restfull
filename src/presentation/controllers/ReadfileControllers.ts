import { AwardStatsDTO } from "@/domain/dto/ProducerDTO";
import { GetMovieIntervalUseCase } from "../../application/use-cases/getMovieIntervalUseCase";
import { MovieDao } from "../../infrastructure/database/MovieDao";

export class ReadfileControllers {
  private getMovieIntervalUseCase: GetMovieIntervalUseCase
  constructor() {
    this.getMovieIntervalUseCase = new GetMovieIntervalUseCase(new MovieDao())
  } 

  async getMovieInterval(): Promise<AwardStatsDTO> {
    return await this.getMovieIntervalUseCase.execute()
  }

}