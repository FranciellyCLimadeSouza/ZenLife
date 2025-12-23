import { registrar, login } from "../services/usuario.service.js";

export async function registrarController(req, res) {
  try {
    const result = await registrar(req.body);
    if (result.erro) return res.status(400).json({ erro: result.erro });
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({ erro: "Falha ao registrar" });
  }
}

export async function loginController(req, res) {
  try {
    const result = await login(req.body);
    if (result.erro) return res.status(401).json({ erro: result.erro });
    return res.status(200).json(result);
  } catch {
    return res.status(500).json({ erro: "Falha ao autenticar" });
  }
}