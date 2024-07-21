import { Router } from "express";
import {
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoriesController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:id", isAuthenticated, getCategory);
router.get("/", isAuthenticated, getCategories);
router.post("/", isAuthenticated, postCategory);
router.put("/:id", isAuthenticated, updateCategory);
router.delete("/:id", isAuthenticated, deleteCategory);

export default router;
