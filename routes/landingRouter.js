import { Router } from "express";
import { getLandingData } from "../controllers/landingController.js";

const router = Router();

router.route("/").get(getLandingData);

export default router;
