import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/database.js";

// Rotas
import indexRoutes from "./routes/index.js";
import contatoRoutes from "./routes/contato.js";
import loginRoutes from "./routes/login.js";
import perguntaRoutes from "./routes/pergunta.js"; // criado agora

// Para usar __dirname em module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Configurar view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Usar as rotas
app.use("/", indexRoutes);
app.use("/contato", contatoRoutes);
app.use("/login", loginRoutes);
app.use("/pergunta", perguntaRoutes);

// Conectar ao banco e iniciar servidor
sequelize.sync().then(() => {
    console.log("Banco de dados conectado.");
    app.listen(PORT, () =>
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    );
});

import perguntasRoutes from "./routes/perguntas.js";
app.use("/perguntas", perguntasRoutes);
