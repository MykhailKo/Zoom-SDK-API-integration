import express, { Request, Response } from "express";
import cors from "cors";
(async () => {
  const app = express();

  const apiRouter = require("./routes/api");

  app.use(express.json()) // express body parser
  app.use(cors()); // setting cors headers
  app.options('*', cors());
  app.use("/api", apiRouter);

  app.all("/", (_req: Request, res: Response) => {
    res.writeHead(301, { Location: "/api" });
    res.end();
  });

  app.listen(8000, () => console.log("Server has started."));
})();
