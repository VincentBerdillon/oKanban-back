const {
    Card,
    Tag
} = require("../models/index.js");

module.exports = {

    getCardsOfList: async (req, res) => {

        try {
            const {
                id
            } = req.params;
            const allCardsOfList = await Card.findAll({
                where: {
                    list_id: id
                },
                include: ["tags"],
                order: [
                    ['position', 'ASC'],
                ]
            });

            if (!allCardsOfList) {
                return res.status(404).json("aucune carte trouvée")
            }

            return res.status(200).json(allCardsOfList)

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    createCard: async (req, res) => {

        try {
            const userInput = req.body;
            if (!userInput.title) {
                return res.status(404).json("titre de carte manquant");
            }

            const newCard = await Card.create(userInput);

            res.status(201).json(newCard);

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    getCardById: async (req, res) => {

        try {
            const {
                id
            } = req.params;
            const cardFound = await Card.findByPk(id, {
                include: ['tags'],
                order: [
                    ['position', 'ASC'],
                ]
            });
            if (!cardFound) {
                return res.status(404).json("carte inexistante");
            }
            res.status(200).json(cardFound);

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    updateCardById: async (req, res, next) => {

        try {
            const {
                id
            } = req.params;

            const card = await Card.findByPk(id, {
                include: ['tags'],
                order: [
                    ['position', 'ASC'],
                ]
            });
            if (!card) {
                return res.status(404).json("carte inexistante");
            }

            const userInput = req.body;

            await card.update(userInput, {
                where: {
                    id
                },
            });

            const updatedCard = await Card.findByPk(id, {
                include: ['tags'],
                order: [
                    ['position', 'ASC'],
                ]
            });

            res.status(200).json(updatedCard)

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    deleteCardById: async (req, res) => {

        try {
            const {
                id
            } = req.params;

            const card = await Card.findByPk(id, {
                include: ['tags'],
                order: [
                    ['position', 'ASC'],
                ]
            });
            if (!card) {
                return res.status(404).json("carte inexistante");
            }

            await card.destroy();

            const cards = await Card.findAll({
                include: ['tags'],
                order: [
                    ['position', 'ASC'],
                ]
            });

            res.status(200).json(cards)

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    addTagToCard: async (req, res) => {

        try {
            const {
                id
            } = req.params;

            let card = await Card.findByPk(id, {
                include: ["tags"],
                order: [
                    ['position', 'ASC'],
                ]
            });

            if (!card) {
                return res.status(404).json("carte inexistante");
            }

            const userInput = req.body.tag_id;

            const tag = await Tag.findByPk(userInput);
            if (!tag) {
                return res.status(404).json("tag inexistant");
            }

            await card.addTag(tag);

            card = await Card.findByPk(id, {
                include: ["tags"],
                order: [
                    ['position', 'ASC'],
                ]
            });

            return res.status(200).json(card);

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

    removeTagOfCard: async (req, res) => {

        try {
            const {
                card_id,
                tag_id
            } = req.params;

            let card = await Card.findByPk(card_id, {
                include: ['tags'],
                order: [
                    ['position', 'ASC'],
                ]
            });


            if (!card) {
                return res.status(404).json("carte inexistante");
            }

            const tag = await Tag.findByPk(tag_id);

            if (!tag) {
                return res.status(404).json("tag inexistant");
            }

            await card.removeTag(tag);

            card = await Card.findByPk(card_id, {
                include: ['tags'],
                order: [
                    ['position', 'ASC'],
                ]
            });

            res.status(200).json(card);

        } catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    },

};