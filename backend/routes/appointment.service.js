import { Router } from "express";
import { autenticar, apenasAdmin } from "../middleware/auth.js";
import {
  criarAgendamentoController,
  listarAgendamentosAdminController,
  alterarStatusAgendamentoController
} from "../controllers/agendamento.controller.js";

const router = Router();

// Usuário autenticado cria seu agendamento
router.post("/agendamentos", autenticar, criarAgendamentoController);

// Admin gerencia agendamentos
router.get("/admin/agendamentos", autenticar, apenasAdmin, listarAgendamentosAdminController);
router.patch("/admin/agendamentos/:id/status", autenticar, apenasAdmin, alterarStatusAgendamentoController);

export default router;