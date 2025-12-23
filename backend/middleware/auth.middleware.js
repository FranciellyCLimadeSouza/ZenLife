import jwt from "jsonwebtoken";
import { config } from "../configuracao/env.js";

export function autenticar(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ erro: "Token ausente" });
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.usuario = payload; // { id, email, papel }
    next();
  } catch {
    return res.status(401).json({ erro: "Token inválido" });
  }
}

export function apenasAdmin(req, res, next) {
  if (req.usuario?.papel !== "admin") return res.status(403).json({ erro: "Acesso restrito ao administrador" });
  next();
}