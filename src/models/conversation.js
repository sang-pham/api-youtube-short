const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");

class Conversation extends Model {}

Conversation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "conversation",
  }
);

module.exports = Conversation;
