import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/routes";
import "./config/init";

const app: Express = express();
const jsonParser = bodyParser.json();
const port = process.env.PORT;

app.use(jsonParser);
app.use(cors());
app.use(router);
app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
