import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import accessEnv from "#root/helpers/accessEnv";

import setupRoutes from "./routes";

const PORT = accessEnv("port", 7100);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

setupRoutes(app);

app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`users services listening on port ${PORT}`);
});
