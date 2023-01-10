import { MongoClient } from "mongodb";

const { MONGODB_URL } = process.env;

export const dbClient = new MongoClient(
  MONGODB_URL ?? "mongodb://127.0.0.1:27017/nextia-api",
);
export const db = dbClient.db();
