const List = require("./list.model.js");
const Card = require("./card.model.js");
const Tag = require("./tag.model.js");

List.hasMany(Card, {
    foreignKey: "list_id",
    as: "cards"
});

Card.belongsTo(List, {
    foreignKey: "list_id",
    as: "list"
});

Tag.belongsToMany(Card, {
    through: "card_has_tag",
    as: "cards",
    foreignKey: 'tag_id'
});

Card.belongsToMany(Tag, {
    through: "card_has_tag",
    as: "tags",
    foreignKey: 'card_id'
});


module.exports = {
    List,
    Card,
    Tag
};