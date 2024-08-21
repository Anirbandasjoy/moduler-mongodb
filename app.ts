import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import userRouter from "./routes/user.router";
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("DB is connected successfully");

    const user = client.db("userDb").collection("users");
    app.use("/user", userRouter(user));
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

run().catch(console.dir);

export default app;
