import "dotenv/config";
import startServer from "./server/startServer.js";
import connectToDatabase from "./database/connectToDatabase.js";

const port = process.env.PORT ?? 3001;

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const databaseUri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster-pro-max.zzkvldx.mongodb.net/insectopedia`;

await connectToDatabase(databaseUri);
startServer(port);
