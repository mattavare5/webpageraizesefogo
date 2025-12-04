import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", {
    page: "login",
    titulo: "Login – Raízes e Fogo",
  });
});

export default router;
