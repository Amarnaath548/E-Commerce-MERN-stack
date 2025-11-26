import express from "express";
import {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategories,
  productsByCategory,
} from "../controller/categoryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { categoryValidator } from "../validators/categoryValidator.js";
import { validateRequest } from "../middleware/validateRequest.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  protect,
  categoryValidator,
  validateRequest,
  createCategory
);

categoryRouter.put(
  "/:id",
  protect,
  categoryValidator,
  validateRequest,
  updateCategory
);
categoryRouter.delete("/:id", protect, deleteCategory);

categoryRouter.get("/:id/products", productsByCategory);

categoryRouter.get("/:id", getCategoryById);

categoryRouter.get("/", getCategories);

export default categoryRouter;
