import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

import { getProfile, updateProfile } from "../controllers/userController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

router.get("/me", isAuthenticated, getProfile);
router.put("/me", isAuthenticated, updateProfile);

export default router;
