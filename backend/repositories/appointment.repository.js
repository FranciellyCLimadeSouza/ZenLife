import { getPool } from "../configuracao/db.config.js";

export async function criarAgendamento(a) {
  const pool = await getPool();
  const result = await pool.request()
    .input("usuarioId", a.usuarioId)
    .input("dataHora", a.dataHora)
    .input("status", a.status || "pendente")
    .input("descricao", a.descricao || "")
    .query(`
      INSERT INTO Agendamentos (usuarioId, dataHora, status, descricao)
      VALUES (@usuarioId, @dataHora, @status, @descricao);
      SELECT SCOPE_IDENTITY() AS id;
    `);
  return { id: result.recordset[0].id };
}

export async function listarTodos() {
  const pool = await getPool();
  const result = await pool.request().query(`
    SELECT a.*, u.nomeCompleto, u.email
    FROM Agendamentos a
    JOIN Usuarios u ON u.id = a.usuarioId
    ORDER BY a.dataHora DESC
  `);
  return result.recordset;
}

export async function atualizarStatus(id, status) {
  const pool = await getPool();
  await pool.request()
    .input("id", id)
    .input("status", status)
    .query(`UPDATE Agendamentos SET status = @status WHERE id = @id`);
}