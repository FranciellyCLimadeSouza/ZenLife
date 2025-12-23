import { criarAgendamento, listarTodos, atualizarStatus } from "../repositories/agendamento.repository.js";

export async function solicitarAgendamento({ usuarioId, dataHora, descricao }) {
  if (!usuarioId || !dataHora) return { erro: "usuarioId e dataHora são obrigatórios" };
  const { id } = await criarAgendamento({ usuarioId, dataHora, descricao, status: "pendente" });
  return { id };
}

export async function listarAgendamentosAdmin() {
  return await listarTodos();
}

export async function alterarStatusAgendamento(id, status) {
  const permitidos = ["pendente", "aceito", "confirmado", "cancelado"];
  if (!permitidos.includes(status)) return { erro: "status inválido" };
  await atualizarStatus(id, status);
  return { ok: true };
}