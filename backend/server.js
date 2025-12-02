import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRouter);

app.use("/api/products", productRouter);

app.use("/api/categories", categoryRouter);

app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on PORT http://localhost:${PORT}`);
  });
};

startServer();
