import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/dbConnect.js";
import { ErrorMiddleware } from "./middlewares/error.js";
const app = express();
dotenv.config();
const port = process.env.PORT;
 
app.use(cors({
  origin: "https://mern-authentication-murex.vercel.app",
  credentials: true
}));
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", userRouter);
app.use(ErrorMiddleware);
dbConnect()
  .then(() =>
    app.listen(port, () => {
      console.log(`Example app listening on  ${port}`);
    }),
  )
  .catch((err) => console.log(err.message));
