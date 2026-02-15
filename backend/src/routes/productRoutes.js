import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {admin} from "../middleware/adminMiddleware.js";
import {
createProduct,
getProducts,
getProductById,
updateProduct,
deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// public routes
router.get("/",getProducts);
router.get("/:id", getProductById);

//Admin routes
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;