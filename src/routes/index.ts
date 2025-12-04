import express from "express";
import Pergunta from "../models/Pergunta.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const perguntas = await Pergunta.findAll({
    raw: true,
    order: [["createdAt", "DESC"]],
    limit: 5,
  });

  res.render("index", {
    page: "index",
    titulo: "Raízes e Fogo",
    perguntas,
  });
});

export default router;
