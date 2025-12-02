import express from "express";
import {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  paginateProducts,
  relatedProducts,
} from "../controller/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { productValidator } from "../validators/productValidator.js";
import { validateRequest } from "../middleware/validateRequest.js";
import upload from "../config/multer.js";

const productRouter = express.Router();

productRouter.post("/",upload.array("images", 5), protect,productValidator,validateRequest, createProduct);

productRouter.put("/:id",upload.array("images", 5), protect,productValidator,validateRequest, updateProduct);

productRouter.delete("/:id", protect, deleteProduct);

productRouter.get("/", paginateProducts);

productRouter.get("/:id/related", relatedProducts);

productRouter.get("/:id", getProductById);

export default productRouter;
