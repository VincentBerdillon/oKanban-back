const {
    Router
} = require("express");
const router = Router();

const listController = require("./controllers/list.controller.js");
const cardController = require("./controllers/card.controller.js");
const tagController = require("./controllers/tag.controller.js");

router.route('/lists')
    .get(listController.renderLists)
    .post(listController.createList)

router.route('/lists/:id(\\d+)')
    .get(listController.getListById)
    .patch(listController.updateListById)
    .delete(listController.deleteListById)

router.route('/lists/:id(\\d+)/cards')
    .get(cardController.getCardsOfList)

router.route('/cards')
    .post(cardController.createCard)

router.route('/cards/:id(\\d+)')
    .get(cardController.getCardById)
    .patch(cardController.updateCardById)
    .delete(cardController.deleteCardById)


router.route('/cards/:id(\\d+)/tags')
    .post(cardController.addTagToCard)

router.route('/cards/:card_id(\\d+)/tags/:tag_id(\\d+)')
    .delete(cardController.removeTagOfCard)

router.route('/tags')
    .get(tagController.renderTags)
    .post(tagController.createTag)

router.route('/tags/:id(\\d+)')
    .get(tagController.getTagById)
    .patch(tagController.updateTagById)
    .delete(tagController.deleteTagById)


module.exports = router;