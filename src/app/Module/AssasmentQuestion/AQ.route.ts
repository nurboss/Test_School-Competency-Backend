import { Router } from "express";
import * as controller from "./AQ.controller";

const router = Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export const assessmentQuestionRoutes = router;
