import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import errorHandler from "./middlewares/error.middleware.js";

import cartRoutes from "./routes/cart.routes.js";

import userRoutes from "./routes/user.routes.js";


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running ",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;