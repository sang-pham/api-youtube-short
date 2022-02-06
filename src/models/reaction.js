const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");
const User = require("./user");
const Video = require("./video");
const Comment = require("./comment");

class Reaction extends Model {}

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM(["like", "love", "haha", "wow", "sad", "angry"]),
    },
  },
  {
    sequelize,
    modelName: "Reaction",
  }
);

Reaction.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Reaction.belongsTo(Video, {
  foreignKey: "video_id",
  onDelete: "cascade",
});

Reaction.belongsTo(Comment, {
  foreignKey: "comment_id",
  onDelete: "cascade",
});

module.exports = Reaction;
