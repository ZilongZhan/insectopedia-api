import "dotenv/config";
import startServer from "./server/startServer.js";
import connectToDatabase from "./database/connectToDatabase.js";

const port = process.env.PORT ?? 3001;

const databaseUri = process.env.DB_URI;

if (!databaseUri) {
  throw new Error("Missing database connection string");
}

await connectToDatabase(databaseUri);
startServer(port);
