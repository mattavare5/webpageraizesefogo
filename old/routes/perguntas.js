import express from "express";
import Pergunta from "../models/Pergunta.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const perPage = 5;
  const offset = (page - 1) * perPage;

  const { count, rows } = await Pergunta.findAndCountAll({
    order: [["createdAt", "DESC"]],
    limit: perPage,
    offset
  });

  const totalPages = Math.ceil(count / perPage);

  res.render("perguntas/index", {
    titulo: "Perguntas",
    page: "perguntas",
    perguntas: rows,
    currentPage: page,
    totalPages
  });
});

router.get("/nova", (req, res) => {
  res.render("perguntas/form", {
    titulo: "Nova Pergunta",
    page: "perguntas",
    pergunta: null
  });
});

router.post("/nova", async (req, res) => {
  const { titulo, descricao } = req.body;
  await Pergunta.create({ titulo, descricao });
  res.redirect("/perguntas");
});

router.get("/editar/:id", async (req, res) => {
  const pergunta = await Pergunta.findByPk(req.params.id);
  if (!pergunta) return res.redirect("/perguntas");
  res.render("perguntas/form", {
    titulo: "Editar Pergunta",
    page: "perguntas",
    pergunta
  });
});

router.post("/editar/:id", async (req, res) => {
  const { titulo, descricao } = req.body;
  await Pergunta.update({ titulo, descricao }, { where: { id: req.params.id } });
  res.redirect("/perguntas");
});

router.post("/deletar/:id", async (req, res) => {
  await Pergunta.destroy({ where: { id: req.params.id } });
  res.redirect("/perguntas");
});

router.get("/ver/:id", async (req, res) => {
  const pergunta = await Pergunta.findByPk(req.params.id);
  if (!pergunta) return res.redirect("/perguntas");
  res.render("pergunta", {
    titulo: pergunta.titulo,
    page: "perguntas",
    pergunta
  });
});

export default router;
