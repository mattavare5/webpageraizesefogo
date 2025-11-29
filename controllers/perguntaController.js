import Pergunta from "./models/Pergunta.js";

export default {
    async index(req, res) {
        const perguntas = await Pergunta.findAll({
            order: [["createdAt", "DESC"]]
        });

        res.render("perguntas/index", {
            titulo: "Perguntas",
            page: "perguntas",
            perguntas
        });
    },

    async criar(req, res) {
        res.render("perguntas/form", {
            titulo: "Nova Pergunta",
            page: "perguntas"
        });
    },

    async salvar(req, res) {
        const { titulo, descricao } = req.body;

        await Pergunta.create({ titulo, descricao });

        res.redirect("/perguntas");
    }
};
