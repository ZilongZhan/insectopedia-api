import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectToDatabase from "../database/connectToDatabase.js";
import Bug from "../bug/model/Bug.js";
import { insect1, insect2 } from "../bug/fixtures.js";

const setupTestDatabase = (): void => {
  let database: MongoMemoryServer;

  beforeAll(async () => {
    database = await MongoMemoryServer.create();

    const connectionString = database.getUri();
    await connectToDatabase(connectionString);

    await Bug.create(insect1, insect2);
  });

  afterEach(async () => {
    await Bug.deleteMany();

    await Bug.create(insect1, insect2);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await database.stop();
  });
};

export default setupTestDatabase;
