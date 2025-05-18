import { Router } from "express";
import { shareBrain, accessBrain } from "../controllers/brain.controller";
import { userMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/brain/share", userMiddleware, shareBrain);
router.post("/brain/:shareLink", accessBrain);

export default router;
