import { GetMovieIntervalUseCase } from "@/application/use-cases/getMovieIntervalUseCase";
import { movieDaoMock } from "./mock/MockMovieDao";

jest.mock("@/infrastructure/database/MovieDao"); 

describe("GetMovieIntervalUseCase", () => {
  let useCase: GetMovieIntervalUseCase;

  beforeEach(() => {
    useCase = new GetMovieIntervalUseCase(movieDaoMock);
  });

  it("deve retornar o produtor com o maior intervalo e o menor intervalo entre prêmios (desconsiderar os repetidos)", async () => {
    
    const result = await useCase.execute();

    expect(movieDaoMock.get).toHaveBeenCalled();
    const expectedResult = {
      "min": [
        {
          "producer": "Bo Derek",
          "interval": 6,
          "previousWin": 1984,
          "followingWin": 1990
        }
      ],
      "max": [
        {
          "producer": "Brian De Palma",
          "interval": 10,
          "previousWin": 1990,
          "followingWin": 2000
        }
      ]
    }   
    
    expect(result).toEqual(expectedResult);
  });

  
  
  it("deve lançar um erro se não houver filmes vencedores", async () => {    
    movieDaoMock.get.mockResolvedValueOnce([]);

    await expect(useCase.execute()).rejects.toThrow("List data not found");
  });
});