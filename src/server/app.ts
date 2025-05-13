import express from "express";
import morgan from "morgan";
import cors from "cors";
import handleHealthCheck from "./middlewares/handleHealthCheck/handleHealthCheck.js";
import handleEndpointNotFound from "./middlewares/handleEndpointNotFound/handleEndpointNotFound.js";
import handleErrors from "./middlewares/handleErrors/handleErrors.js";
import bugsRouter from "../bug/router/bugsRouter.js";

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const allowedOriginPatterns = process.env.ALLOWED_ORIGIN_PATTERNS;

      if (!allowedOriginPatterns) {
        const error = new Error("Allowed origin patterns not defined");

        return callback(error, false);
      }

      const origins = allowedOriginPatterns.split(",");

      const isAllowedOrigin = origins.some((thisOrigin) =>
        origin?.includes(thisOrigin),
      );

      if (isAllowedOrigin) {
        return callback(null, true);
      }

      const error = new Error("Origin not allowed by CORS");

      return callback(error, false);
    },
    credentials: true,
  }),
);

app.get("/", handleHealthCheck);

app.use("/bugs", bugsRouter);

app.use(handleEndpointNotFound);
app.use(handleErrors);

export default app;
