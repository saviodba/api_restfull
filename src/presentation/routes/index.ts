import { Router } from "express";
import { router } from "./IntervalMoviesRoutes";

export const allRoutes = Router();

allRoutes.use(router);