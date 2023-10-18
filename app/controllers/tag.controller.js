const {
    Tag
} = require("../models/index.js");

module.exports = {

    renderTags: async (_, res) => {

        try {
            const tags = await Tag.findAll();
            res.status(200).json(tags);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    createTag: async (req, res) => {

        try {
            const userInput = req.body;
            if (!userInput.name) {
                return res.status(404).json("nom de tag manquant")
            }

            const newTag = await Tag.create(userInput);

            return res.status(201).json(newTag);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    getTagById: async (req, res) => {

        try {
            const {
                id
            } = req.params;
            const TagFound = await Tag.findByPk(id);
            if (!TagFound) {
                return res.status(404).json("tag inexistant")
            }
            res.status(200).json(TagFound);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    updateTagById: async (req, res) => {

        try {
            const {
                id
            } = req.params;

            const tag = await Tag.findByPk(id);
            if (!tag) {
                return res.status(404).json("tag inexistant");
            }

            const userInput = req.body;
            if (!userInput.name) {
                return res.status(404).json("nom de tag manquant")
            }

            await tag.update(userInput);

            const updatedTag = await Tag.findByPk(id);

            res.json(updatedTag);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    deleteTagById: async (req, res) => {

        try {
            const {
                id
            } = req.params;

            const tag = await Tag.findByPk(id);
            if (!tag) {
                return res.status(404).json("tag inexistant");
            }

            await tag.destroy();

            const tags = await Tag.findAll();

            res.status(200).json(tags);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

};