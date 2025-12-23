import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.routes.js";
import agendamentoRoutes from "./routes/agendamento.routes.js";
import "./configuracao/env.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", usuarioRoutes);
app.use("/api", agendamentoRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ZenLife API rodando na porta ${PORT}`));