import { getPool } from "../configuracao/db.config.js";

export async function criarUsuario(u) {
  const pool = await getPool();
  const result = await pool.request()
    .input("nomeCompleto", u.nomeCompleto)
    .input("dataNascimento", u.dataNascimento)
    .input("endereco", u.endereco)
    .input("cpf", u.cpf)
    .input("email", u.email)
    .input("senhaHash", u.senhaHash)
    .input("papel", u.papel || "usuario")
    .query(`
      INSERT INTO Usuarios (nomeCompleto, dataNascimento, endereco, cpf, email, senhaHash, papel)
      VALUES (@nomeCompleto, @dataNascimento, @endereco, @cpf, @email, @senhaHash, @papel);
      SELECT SCOPE_IDENTITY() AS id;
    `);
  return { id: result.recordset[0].id };
}

export async function buscarPorEmail(email) {
  const pool = await getPool();
  const result = await pool.request().input("email", email)
    .query(`SELECT TOP 1 * FROM Usuarios WHERE email = @email`);
  return result.recordset[0] || null;
}