import { solicitarAgendamento, listarAgendamentosAdmin, alterarStatusAgendamento } from "../services/agendamento.service.js";

export async function criarAgendamentoController(req, res) {
  try {
    const result = await solicitarAgendamento({ usuarioId: req.usuario.id, ...req.body });
    if (result.erro) return res.status(400).json({ erro: result.erro });
    return res.status(201).json(result);
  } catch {
    return res.status(500).json({ erro: "Falha ao criar agendamento" });
  }
}

export async function listarAgendamentosAdminController(req, res) {
  try {
    const lista = await listarAgendamentosAdmin();
    return res.status(200).json(lista);
  } catch {
    return res.status(500).json({ erro: "Falha ao listar agendamentos" });
  }
}

export async function alterarStatusAgendamentoController(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const r = await alterarStatusAgendamento(Number(id), status);
    if (r.erro) return res.status(400).json({ erro: r.erro });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ erro: "Falha ao atualizar status" });
  }
}