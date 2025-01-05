import { AwardStatsDTO, ProducerDTO } from "@/domain/dto/ProducerDTO";
import { IMovieRepositories } from "@/domain/interfaces/IMovieRepositories";

export class GetMovieIntervalUseCase {

  private minIntervalProducer : ProducerDTO | null = null;    
  private maxIntervalProducer : ProducerDTO | null = null;  

  constructor(private _movieRepositorie:IMovieRepositories) {}

  async execute(): Promise<AwardStatsDTO> {
    const lstMoviesWinners = await this._movieRepositorie.get();
    
    if(!lstMoviesWinners || lstMoviesWinners.length === 0){
      throw new Error("List data not found");
    }

    const producers:ProducerYears[] = lstMoviesWinners.reduce((acc, movie) => {
      let producerData = acc.find((producer)=> producer.producer === movie.producers);
      
      if(!producerData){
        producerData = { producer: movie.producers, year: [] };
        acc.push(producerData);
      }
      producerData.year.push(movie.year);  
      return acc;
      }
    , [] as ProducerYears[]
    );
      

    const filteredProducers = producers.filter(producer => producer.year.length > 1);

    const listIntervalProducer = filteredProducers.map(producer =>{
      const {producer:name, year} = producer
      const sortYears = [...year].sort((a,b)=> a - b)

      const intervals = sortYears.slice(1).map((yearValue, index)=>({
        interval:yearValue  - sortYears[index],
        previousWin:sortYears[index],
        followingWin:yearValue
      }))

      return {
        producer:name,
        intervals:intervals
      }
    })
    

    const awartstatsDto: AwardStatsDTO = { min: [], max: [] };
    this.minIntervalProducer = null;
    this.maxIntervalProducer = null;


    for (const producer of listIntervalProducer) {

      const minIntervalData = producer.intervals.reduce((min, current)=>
        current.interval < min.interval ? current : min
      )

      const maxIntervalData = producer.intervals.reduce((max, current)=>
        current.interval > max.interval ? current : max
      )
      

      if( !this.minIntervalProducer || 
          minIntervalData.interval < this.minIntervalProducer.interval
        ){  
        
          if(minIntervalData.interval === 0){
            continue;
          }

        this.minIntervalProducer = {
          producer: producer.producer,
          interval: minIntervalData.interval || 0,
          previousWin: minIntervalData.previousWin,
          followingWin: minIntervalData.followingWin
        }
        awartstatsDto.min = [this.minIntervalProducer]           
    }

    if( !this.maxIntervalProducer || 
      maxIntervalData.interval > this.maxIntervalProducer.interval
    ){      
      this.maxIntervalProducer = {
        producer:producer.producer,
        interval: maxIntervalData.interval,
        previousWin: maxIntervalData.previousWin,
        followingWin: maxIntervalData.followingWin
      } 

      awartstatsDto.max = [this.maxIntervalProducer ] 
    }
    
    }
    
    return awartstatsDto;
  }

}

type ProducerYears = {
  producer:string;
  year:number[];
}