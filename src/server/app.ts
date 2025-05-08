import express from "express";
import morgan from "morgan";
import handleHealthCheck from "./middlewares/handleHealthCheck/handleHealthCheck.js";

const app = express();

app.use(morgan("dev"));

app.get("/", handleHealthCheck);

export default app;
