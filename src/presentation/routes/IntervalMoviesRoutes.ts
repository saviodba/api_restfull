import { ReadfileControllers } from "@/presentation/controllers/ReadfileControllers";
import { Router } from "express";

export const router = Router()

const readFile = new ReadfileControllers();


router.get("/interval-movies", async (req, res) => {
  
  try {
    const returnMovies =  await readFile.getMovieInterval()
    res.status(200).json(returnMovies)  
  } catch (error:any) {
    console.error(error.message)
    res.status(400).json({error: "Error to get movies"})  
  }

})

