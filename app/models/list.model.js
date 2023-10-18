const {
    Model,
    DataTypes
} = require("sequelize");
const sequelize = require("../sequelize_client");

class List extends Model {}

List.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: "list",
});

module.exports = List;