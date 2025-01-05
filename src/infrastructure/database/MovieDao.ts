import { Movie } from "@/domain/entities/Movie";
import { IMovieRepositories } from "@/domain/interfaces/IMovieRepositories";
import { db } from "../../config/db/sqliteConfig";

export class MovieDao implements IMovieRepositories {       

  private dbConfig = db;

  constructor() {}

  async get(): Promise<Movie[]> {

    try {
          return new Promise((resolve, reject) => {
            this.dbConfig.all(`SELECT * FROM movies WHERE winner = 'yes' `, (err:Error, rows:Movie[]) => {
              if (err) {
                console.error(err);
                reject(err);
              }
              resolve(rows);
            });
          });

        
        
    } catch (error) {
      console.error(error);
      throw new Error("Error List data");
    }
    
  }
}