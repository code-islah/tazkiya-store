import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

import {
 createOrder,
 getMyOrders,
 getAllOrders,
 updateOrderStatus 
} from "../controllers/orderController.js";


const router = express.Router();

// customer routes
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

// admin routes
router.get("/", protect, admin, getAllOrders);
router.put("/:id", protect, admin, updateOrderStatus);

export default router;