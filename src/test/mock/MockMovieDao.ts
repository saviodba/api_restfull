import { Movie } from "@/domain/entities/Movie";
import { MovieDao } from "@/infrastructure/database/MovieDao";


const MockLstMovies: Movie[] = [
  Movie.create({ 
    id: 1,
    title: "Bolero",
    studios: "Cannon Films",
    year: 1984,
    producers: "Bo Derek",
    winner: "yes"
  }),
  Movie.create({ 
    id: 2,
    title: "Ghosts Can't Do It",
    studios: "Triumph Releasing",
    year: 1990,
    producers: "Bo Derek",
    winner: "yes"
  }),
  Movie.create({ 
    id: 3,
    title: "Indecent Proposal",
    studios: "Paramount Pictures",
    year: 1992,
    producers: "Sherry Lansing",
    winner: "yes"
  }),
  Movie.create({ 
    id: 4,
    title: "Indecent Proposal teste",
    studios: "Paramount Pictures",
    year: 1993,
    producers: "Sherry Lansing",
    winner: "yes"
  }),
  Movie.create({ 
    id: 5,
    title: "Indecent Proposal",
    studios: "Paramount Pictures",
    year: 1993,
    producers: "Sherry Lansing",
    winner: "yes"
  }),
  Movie.create({ 
    id: 6,
    title: "Indecent Proposal teste",
    studios: "Paramount Pictures",
    year: 1995,
    producers: "Sherry Lansing",
    winner: "yes"
  }),
  Movie.create({ 
    id: 7,
    title: "The Bonfire of the Vanities",
    studios: "Warner Bros",
    year: 1990,
    producers: "Brian De Palma",
    winner: "yes"
  }),
  Movie.create({ 
    id: 8,
    title: "Graffiti Bridge",
    studios: "Warner Bros",
    year: 2000,
    producers: "Brian De Palma",
    winner: "yes"
  })
];


export const movieDaoMock = {
  get: jest.fn().mockResolvedValue(MockLstMovies), 
} as unknown as jest.Mocked<MovieDao>;

