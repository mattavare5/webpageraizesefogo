const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { titulo: "Raízes e Fogo" , page: "home"});
});

module.exports = router;