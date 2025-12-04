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

/* Página para visualizar (alias usado pela view) */
router.get("/ver/:id", async (req, res) => {
  const { id } = req.params;
  const pergunta = await Pergunta.findByPk(id);
  if (!pergunta) return res.redirect("/perguntas");
  res.render("pergunta", {
    page: "perguntas",
    titulo: (pergunta as any).titulo,
    pergunta,
  });
});

/* Página de edição (mostrar formulário com dados) */
router.get("/editar/:id", async (req, res) => {
  const { id } = req.params;
  const pergunta = await Pergunta.findByPk(id);
  if (!pergunta) return res.redirect("/perguntas");
  res.render("perguntas/form", {
    page: "perguntas",
    titulo: "Editar Pergunta",
    pergunta,
  });
});

/* Atualizar pergunta */
router.post("/editar/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;
  await Pergunta.update({ titulo, descricao }, { where: { id } });
  res.redirect("/perguntas");
});

/* Deletar pergunta */
router.post("/deletar/:id", async (req, res) => {
  const { id } = req.params;
  await Pergunta.destroy({ where: { id } });
  res.redirect("/perguntas");
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
