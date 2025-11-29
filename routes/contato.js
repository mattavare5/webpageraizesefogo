const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("contato", { titulo: "Contato - Raízes e Fogo" , page: "contato"});
});

router.post("/", (req, res) => {
    const { nome, cpf, usuario, senha, estado, cep } = req.body;

    res.json({
        mensagem: "Cadastro enviado com sucesso!",
        dados: { nome, cpf, usuario, estado, cep }
    });
});

module.exports = router;
