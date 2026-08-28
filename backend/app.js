 import express from "express";
 import cors from "cors";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import { errorHandler } from "./src/middleware/error.middleware.js";
import router from "./src/routes/short_url.route.js";
import urlSchema from "./src/models/short_url.model.js";
import {redirectFromShortUrl} from "./src/controller/short_url.controller.js";
import authRoute from './src/routes/auth.route.js';
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/create", router);
app.get("/:id",redirectFromShortUrl)
app.use(errorHandler);
app.use('/api/auth', authRoute);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});