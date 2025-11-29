const express = require("express");
const path = require("path");

const app = express();

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Arquivos estáticos
app.use(express.static("public"));

// Captura de dados de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas separadas
const rotasIndex = require("./routes/index");
const rotasContato = require("./routes/contato");
const rotasLogin = require("./routes/login");

app.use("/", rotasIndex);
app.use("/contato", rotasContato);
app.use("/login", rotasLogin);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
