import express from "express";
import Pergunta from "../models/Pergunta.js";

const router = express.Router();

/* Página de listagem de perguntas */
router.get("/", async (req, res) => {
  const perguntas = await Pergunta.findAll({
    raw: true,
    order: [["createdAt", "DESC"]],
  });

  res.render("perguntas/index", {
    page: "perguntas",
    titulo: "Perguntas",
    perguntas,
    currentPage: 1,
    totalPages: 1,
  });
});

/* Página para criar pergunta */
router.get("/nova", (req, res) => {
  res.render("novaPergunta", {
    page: "perguntas",
    titulo: "Criar Pergunta",
  });
});

/* Página individual */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const pergunta = await Pergunta.findByPk(id);

  if (!pergunta) return res.redirect("/");

  res.render("pergunta", {
    page: "perguntas",
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
