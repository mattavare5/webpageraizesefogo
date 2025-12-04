const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login", { titulo: "Login - Raízes e Fogo" , page: "login"});
});

router.post("/", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        return res.json({ sucesso: true, mensagem: "Login realizado!" });
    }

    res.json({ sucesso: false, mensagem: "Credenciais inválidas." });
});

module.exports = router;
