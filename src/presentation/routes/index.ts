import { Router } from "express";
import { router } from "./ReadFilesRoutes";

export const allRoutes = Router();

allRoutes.use(router);