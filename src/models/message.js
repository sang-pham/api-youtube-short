const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");
const User = require("./user");
const Conversation = require("./conversation");

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Message",
  }
);

User.hasMany(Message, {
  as: "messages",
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

Message.belongsTo(User, {
  as: "user",
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
});

Conversation.hasMany(Message, {
  as: "messages",
  foreignKey: "conversation_id",
});

Message.belongsTo(Conversation, {
  foreignKey: "conversation_id",
  onDelete: "cascade",
});

module.exports = Message;
