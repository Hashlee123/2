import { Router } from "express";
import { createContent, getContents, deleteContent } from "../controllers/content.controller";
import { userMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/content", userMiddleware, createContent);
router.get("/contents", userMiddleware, getContents);
router.delete("/contents", userMiddleware, deleteContent);

export default router;
