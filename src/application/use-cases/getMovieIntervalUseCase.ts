import { AwardStatsDTO, ProducerDTO } from "@/domain/dto/ProducerDTO";
import { IMovieRepositories } from "@/domain/interfaces/IMovieRepositories";

export class GetMovieIntervalUseCase {

  constructor(private _movieRepositorie: IMovieRepositories) {}

  async execute(): Promise<AwardStatsDTO> {
    const lstMoviesWinners = await this._movieRepositorie.getInterval();
    
    if (!lstMoviesWinners || lstMoviesWinners.length === 0) {
      throw new Error("List data not found");
    }
 
    const producersMap = lstMoviesWinners.reduce((acc, movie) => {
      const producer = movie.producers;
      if (!acc.has(producer)) {
        acc.set(producer, []);
      }
      acc.get(producer)?.push(movie.year);
      return acc;
    }, new Map<string, number[]>());

    const filteredProducers = Array.from(producersMap.entries())
      .filter(([_, years]) => years.length > 1)
      .map(([producer, years]) => ({
        producer,
        years: years.sort((a, b) => a - b),
      }));

    const intervals: ProducerDTO[] = [];

    for (const producer of filteredProducers) {
      for (let i = 1; i < producer.years.length; i++) {
        intervals.push({
          producer: producer.producer,
          interval: producer.years[i] - producer.years[i - 1],
          previousWin: producer.years[i - 1],
          followingWin: producer.years[i]
        });
      }
    }

    const minInterval = Math.min(...intervals.map(i => i.interval));
    const maxInterval = Math.max(...intervals.map(i => i.interval));

    const minWinners = intervals.filter(i => i.interval === minInterval);
    const maxWinners = intervals.filter(i => i.interval === maxInterval);

    
    const minFiltered = minWinners.filter(min => 
      !maxWinners.some(max => max.producer === min.producer)
    );
    const maxFiltered = maxWinners.filter(max => 
      !minWinners.some(min => min.producer === max.producer)
    );

    const awardStats: AwardStatsDTO = {
      min: minFiltered,
      max: maxFiltered
    };

    return awardStats;
  }
}
