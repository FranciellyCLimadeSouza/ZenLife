import { Router } from "express";
import { registrarController, loginController } from "../controllers/usuario.controller.js";

const router = Router();
router.post("/auth/register", registrarController);
router.post("/auth/login", loginController);

export default router;