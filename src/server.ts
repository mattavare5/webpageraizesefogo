import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import sequelize from "./config/database";

import indexRoutes from "./routes/index";
import contatoRoutes from "./routes/contato";
import loginRoutes from "./routes/login";
import perguntaRoutes from "./routes/pergunta";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/contato", contatoRoutes);
app.use("/login", loginRoutes);
app.use("/pergunta", perguntaRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Banco conectado com sucesso (TypeScript)!");
    app.listen(PORT, () =>
      console.log(`Servidor rodando em http://localhost:${PORT}`)
    );
  })
  .catch((err: any) => console.error("Erro ao conectar ao banco:", err));
