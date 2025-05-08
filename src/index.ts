import "dotenv/config";
import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 3001;

startServer(port);
