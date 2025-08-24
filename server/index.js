import "dotenv/config"
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./src/features/user/user_routes.js";
import connectDb from "./config/mongoose.js";
import cors from "cors";

const PORT = process.env.PORT || 8000;
const app = express();

// cors configuration
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true,
    methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    allowedHeaders:
      "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization",

  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.end("API working fine"))
app.use("/api/v1/user", userRouter);

// error handlers
app.use((req, res) => res.send("wrong api"));

// connect to server and databases
connectDb();
app.listen(PORT, (err) => {
  console.log(err || `Connected to Server`);
});
