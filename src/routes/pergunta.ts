import express from "express";
import Pergunta from "../models/Pergunta.js";

const router = express.Router();

/* Página para criar pergunta */
router.get("/nova", (req, res) => {
  res.render("novaPergunta", {
    titulo: "Criar Pergunta",
  });
});

/* Página individual */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const pergunta = await Pergunta.findByPk(id);

  if (!pergunta) return res.redirect("/");

  res.render("pergunta", {
    titulo: (pergunta as any).titulo,
    pergunta,
  });
});

/* Salvar pergunta */
router.post("/nova", async (req, res) => {
  const { titulo, descricao } = req.body;

  await Pergunta.create({ titulo, descricao });

  res.redirect("/");
});

export default router;
