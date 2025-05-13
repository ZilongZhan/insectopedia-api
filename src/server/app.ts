import express from "express";
import morgan from "morgan";
import handleHealthCheck from "./middlewares/handleHealthCheck/handleHealthCheck.js";
import handleEndpointNotFound from "./middlewares/handleEndpointNotFound/handleEndpointNotFound.js";
import handleErrors from "./middlewares/handleErrors/handleErrors.js";
import bugsRouter from "../bug/router/bugsRouter.js";
import handleCors from "./middlewares/handleCors/handleCors.js";

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());
app.use(handleCors);

app.get("/", handleHealthCheck);

app.use("/bugs", bugsRouter);

app.use(handleEndpointNotFound);
app.use(handleErrors);

export default app;
