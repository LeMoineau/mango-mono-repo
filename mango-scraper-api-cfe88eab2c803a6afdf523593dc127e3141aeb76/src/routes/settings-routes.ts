import { Router, Request, Response } from "express";
import settingsController from "../controllers/settings-controller";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send(settingsController.getConfig());
});

export default router;
