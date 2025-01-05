export interface ProducerDTO {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface AwardStatsDTO {
  min: ProducerDTO[];
  max: ProducerDTO[];
}
