import { Router, Request, Response } from "express";
import mangasController from "../controllers/mangas-controller";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.send(await mangasController.getAll({}));
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/:name/", async (req: Request, res: Response) => {});
router.get("/:name/chapters", async (req: Request, res: Response) => {});

export default router;
