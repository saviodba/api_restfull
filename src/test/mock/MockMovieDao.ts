import { Movie } from "@/domain/entities/Movie";
import { MovieDao } from "@/infrastructure/database/MovieDao";
import "dotenv/config";
import fs from "fs";

const filePath = process.env.FILE_PATH;

const MockLstMovies: Movie[] = [];

if (!filePath) {
  throw new Error("FILE_PATH is not defined in the environment variables");
}
const data = fs.readFileSync(filePath, "utf8");

if (!data) {
  throw new Error(".csv file data not found, check path in .env file");
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

  MockLstMovies.push(movie);
}

export const movieDaoMock = {
  getInterval: jest.fn().mockResolvedValue(MockLstMovies),
} as unknown as jest.Mocked<MovieDao>;
