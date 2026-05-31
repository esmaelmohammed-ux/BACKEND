import express from "express";
import cors from "cors";
import "dotenv/config";
import fs from "fs";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { connectDB } from "./config/db.js";
// app config
const app = express();
const port = process.env.PORT || 4000;
// middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Create uploads directory if it doesn't exist
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// DB connection
connectDB();
// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

// routes
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
