const { DataTypes, Model } = require("sequelize");
const Message = require("./message");
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
    modelName: "Conversation",
  }
);

module.exports = Conversation;
