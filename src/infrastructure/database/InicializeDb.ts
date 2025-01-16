import { db } from "@/config/db/sqliteConfig";
import { Movie } from "@/domain/entities/Movie";
import fs from "fs";

export class InitializeDB {

  private _filePath = String(process.env.FILE_PATH);

  constructor() {}

  static createTable() {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS movies (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          studios TEXT,
          year INTEGER,
          producers TEXT,
          winner TEXT
        )
      `);
    }); 
  
   new InitializeDB().importData();    
  }
  
  private async importData() {
    await this.delete();
      fs.readFile(this._filePath, "utf8", async (err, data) => {
        if (err) { 
          console.error(err)         
          throw new Error(".csv file data not found, check path in .env file")          
        }
      
        if(!data){
          throw new Error(".csv file data not found, check path in .env file")
        }
        const lines = data.split("\n").map((line) => line.split(";"));   
            
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (line.length < 4) continue;
          const movie = Movie.create({
            title: line[1],
            studios: line[2],
            year: Number(line[0]),
            producers: line[3],
            winner: line[4] || "",
          });
          await this.insert(movie);
        }
            
      });
        
  }

  private async insert(movie: Movie): Promise<void> {

    db.run( 
      `INSERT INTO movies (title, studios, year, producers, winner) VALUES (?, ?, ?, ?, ?)`,
      [movie.title, movie.studios, movie.year, movie.producers, movie.winner],
      (err:any) => {
        if (err) {
          console.error(err.message);          
          throw new Error("Error to insert movie");
        }       
      }
    );
  }

  private async delete(){
    db.run('DELETE FROM movies', (err:any) => {
      if (err) {
          console.error(err.message);
          return;
      }
      
      db.run('DELETE FROM sqlite_sequence WHERE name="movies"', (err:any) => {
          if (err) {
              console.error(err.message);
              return;
          }          
      });
  });
  }

}