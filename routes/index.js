import express from "express";
import Pergunta from "../models/Pergunta.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const perguntas = await Pergunta.findAll({
        order: [["createdAt", "DESC"]]
    });

    res.render("index", {
        titulo: "Raízes e Fogo",
        page: "home",
        perguntas
    });
});

export default router;
