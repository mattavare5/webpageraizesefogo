import express from "express";
import Pergunta from "../models/Pergunta.js";

const router = express.Router();

// FORMULÁRIO DE NOVA PERGUNTA
router.get("/nova", (req, res) => {
    res.render("novaPergunta", {
        page: "perguntas"
    });
});

// SALVAR PERGUNTA (POST)
router.post("/nova", async (req, res) => {
    const { titulo, descricao } = req.body;

    await Pergunta.create({
        titulo,
        descricao
    });

    res.redirect("/");
});

// MOSTRAR PERGUNTA POR ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const pergunta = await Pergunta.findByPk(id);

    if (!pergunta) {
        return res.redirect("/");
    }

    res.render("pergunta", {
        pergunta,
        page: "perguntas"
    });
});

export default router;
