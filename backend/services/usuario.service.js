import jwt from "jsonwebtoken";
import { config } from "../configuracao/env.js";
import { validarCadastro } from "../utilitarios/validacao.js";
import { hashPassword, comparePassword } from "../utilitarios/hash.js";
import { criarUsuario, buscarPorEmail } from "../repositories/usuario.repository.js";

export async function registrar(dados) {
  const erros = validarCadastro(dados);
  if (erros.length) return { erro: erros.join(", ") };

  const existente = await buscarPorEmail(dados.email);
  if (existente) return { erro: "Email já cadastrado" };

  const senhaHash = hashPassword(dados.senha);
  const { id } = await criarUsuario({ ...dados, senhaHash });
  const token = jwt.sign({ id, email: dados.email, papel: "usuario" }, config.jwtSecret, { expiresIn: config.jwtExpires });

  return { id, token };
}

export async function login({ email, senha }) {
  const usuario = await buscarPorEmail(email);
  if (!usuario || !comparePassword(senha, usuario.senhaHash)) return { erro: "Credenciais inválidas" };

  const token = jwt.sign({ id: usuario.id, email: usuario.email, papel: usuario.papel }, config.jwtSecret, { expiresIn: config.jwtExpires });
  return { token, usuario: { id: usuario.id, nomeCompleto: usuario.nomeCompleto, email: usuario.email, papel: usuario.papel } };
}