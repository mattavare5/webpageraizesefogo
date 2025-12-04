import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("contato", {
    page: "contato",
    titulo: "Contato – Raízes e Fogo",
  });
});

export default router;
