const {
    Model,
    DataTypes
} = require("sequelize");
const sequelize = require("../sequelize_client");

class Card extends Model {}

Card.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    color: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'card',
});

module.exports = Card;