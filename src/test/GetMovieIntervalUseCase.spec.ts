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
    expect(movieDaoMock.getInterval).toHaveBeenCalled();
    const expectedResult = {
      "min": [
        {
          "producer": "Yoram Globus and Menahem Golan",
          "interval": 1,
          "previousWin": 1986,
          "followingWin": 1987
        },
        {
          "producer": "Wyck Godfrey, Stephenie Meyer and Karen Rosenfelt",
          "interval": 1,
          "previousWin": 2011,
          "followingWin": 2012
        }
      ],
      "max": [
        {
          "producer": "Jerry Weintraub",
          "interval": 9,
          "previousWin": 1980,
          "followingWin": 1989
        }
      ]
    }  
    expect(result).toEqual(expectedResult);
  });

  
  
  it("deve lançar um erro se não houver filmes vencedores", async () => {    
    movieDaoMock.getInterval.mockResolvedValueOnce([]);

    await expect(useCase.execute()).rejects.toThrow("List data not found");
  });
});