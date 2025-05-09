import express from "express";
import morgan from "morgan";
import handleHealthCheck from "./middlewares/handleHealthCheck/handleHealthCheck.js";
import handleErrors from "./middlewares/handleErrors/handleErrors.js";

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));

app.get("/", handleHealthCheck);

app.use(handleErrors);

export default app;
