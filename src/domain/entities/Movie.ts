import { MovieListDTO } from "../dto/MovieListDTO";

type MovieType = {
  id?: number;
  title: string;
  studios: string;
  year: number;
  producers: string;
  winner: string;
};

export class Movie {
  
  private constructor(
    private _id:number, 
    private _title:string, 
    private _studios:string, 
    private _year:number, 
    private _producers:string, 
    private _winner:string
  ) {
    this._id = _id;
    this._title = _title || "";
    this._studios = _studios || "";
    this._year = _year || 0;
    this._producers = _producers || "";
    this._winner = _winner || "";
  }

  static create(movie: MovieType) {
    
    const id = movie.id || 0;
    return new Movie(      
      id,
      movie.title,
      movie.studios,
      movie.year,
      movie.producers,
      movie.winner
    );    
  }


  get id(): number {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get studios(): string {
    return this._studios;
  }
  get year(): number {
    return this._year;
  } 
  get producers():string {
    return this._producers;
  }
  get winner():string {
    return this._winner;
  } 

  toDo(): MovieListDTO {
    return {
      id: this.id,
      title: this.title,
      studios: this.studios,
      year: this.year,
      producers: this.producers,
      winner: this.winner
    };
  }

}