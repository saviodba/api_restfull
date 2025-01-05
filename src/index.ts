import "dotenv/config";
import express from "express";
import 'module-alias/register';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { InitializeDB } from "./infrastructure/database/InicializeDb";
import { allRoutes } from "./presentation/routes";

export const app = express();
app.use(express.json());
app.use(allRoutes);

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
      swaggerOptions: { persistAuthorization: true },
  }),
);

InitializeDB.createTable();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


