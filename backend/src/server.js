import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();



import { protect } from "./middleware/authMiddleware.js";
import { admin } from "./middleware/adminMiddleware.js";




//middlewares

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);


app.get("/api/admin-only", protect, admin, (req, res) => {
  res.json({
    message: "Welcome Admin of Tazkiya Store",
    user: req.user
  });
});


// test route
app.get("/", (req, res) => {
  res.send("Tazkiya Store API is running...");
});

const PORT = process.env.PORT || 5000;

/*
app.listen(PORT, () => {
  console.log(`Tazkiya Store server is running on PORT : ${PORT}`);
});
*/




app.listen(5000, "0.0.0.0", () => {
  console.log("Tazkiya Store running on port 5000");
});






















