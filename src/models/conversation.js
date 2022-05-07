const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

class Conversation extends Model { }

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
    tableName: "conversations",
    timestamps: false,
  }
);

module.exports = Conversation;
