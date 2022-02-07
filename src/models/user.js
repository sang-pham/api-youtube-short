const sequelize = require("./index");
const { DataTypes, Model } = require("sequelize");
const Conversation = require("./conversation");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING, //mean VARCHAR(255)
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING, //mean VARCHAR(255)
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash_password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    avatar_path: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "user",
    indexes: [
      { fields: ["first_name", "last_name"] },
      { fields: ["user_name"] },
    ],
  }
);

const Users_Conversations = sequelize.define(
  "users_conversations",
  {
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: true }
);

User.belongsToMany(Conversation, {
  through: "users_conversations",
  as: "userConversations",
  foreignKey: "user_id",
});

Conversation.belongsToMany(User, {
  through: "users_conversations",
  foreignKey: "conversation_id",
});

module.exports = User;
