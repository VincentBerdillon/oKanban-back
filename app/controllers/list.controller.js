const {
    List
} = require("../models/index.js");

module.exports = {

    renderLists: async (_, res) => {

        try {
            const lists = await List.findAll({
                include: [{
                    association: 'cards',
                    include: [{
                        association: 'tags',
                    }]
                }, ],
                order: [
                    ['id', 'ASC'],
                    ['cards', 'position', 'ASC'],
                    ['cards', 'tags', 'name', 'ASC']
                ]
            });
            res.status(200).json(lists);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    createList: async (req, res) => {

        try {
            const userInput = req.body;
            const newList = await List.create(userInput);
            if (!userInput.name) {
                return res.status(404).json(
                    "nom de liste manquant"
                );
            }
            res.status(201).json(newList);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },


    getListById: async (req, res) => {

        try {
            const {
                id
            } = req.params;
            const listFound = await List.findByPk(id, {
                include: [{
                    association: "cards",
                    include: [{
                        association: "tags"
                    }]
                }],
                order: [
                    ["cards", "position", "ASC"],
                    ['cards', 'tags', 'name', 'ASC']
                ]
            });
            if (!listFound) {
                return res.status(404).json("Liste inexistante");
            };

            res.status(200).json(listFound);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    updateListById: async (req, res) => {

        try {
            const {
                id
            } = req.params;

            const list = await List.findByPk(id);
            if (!list) {
                return res.status(404).json("Liste inexistante");
            }

            const userInput = req.body;

            await List.update(userInput, {
                where: {
                    id
                },
            });

            const listUpdated = await List.findByPk(id, {
                include: [{
                    association: "cards",
                    include: [{
                        association: "tags"
                    }]
                }],
                order: [
                    ["cards", "position", "ASC"],
                    ['cards', 'tags', 'name', 'ASC']
                ]
            });

            res.status(200).json(listUpdated)
        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    deleteListById: async (req, res) => {

        try {
            const {
                id
            } = req.params;
            const list = await List.findByPk(id);
            if (!list) {
                return res.status(404).json("liste inexistante");
            }
            await list.destroy();

            const lists = await List.findAll({
                include: [{
                    association: 'cards',
                    include: [{
                        association: 'tags',
                    }]
                }, ],
                order: [
                    ['id', 'ASC'],
                    ['cards', 'position', 'ASC'],
                    ['cards', 'tags', 'name', 'ASC']
                ]
            });
            res.status(200).json(lists);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.toString());
        }
    },

};