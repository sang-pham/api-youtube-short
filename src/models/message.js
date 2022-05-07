const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

class Message extends Model { }

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "messages"
  }
);


module.exports = Message;
