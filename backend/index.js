import express, { request,response} from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodels.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:["Content-type"],
  })
);
app.get("/", (request,response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN Stack Tutorial");
});
app.use("/books", booksRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`App is Listening to port:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
