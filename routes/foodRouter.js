import { Router } from "express";
import {
  getFood,
  postFood,
  getFoods,
  updateFood,
  getSuggestions,
} from "../controllers/foodsController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/suggestions",isAuthenticated,getSuggestions);
router.get("/:id", isAuthenticated, getFood);
router.get("/", isAuthenticated, getFoods);
router.post("/", isAuthenticated, postFood);
router.put("/:id", isAuthenticated, updateFood);

export default router;
