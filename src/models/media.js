const { DataTypes, Model } = require("sequelize");
const Message = require("./message");
const Comment = require("./comment");
const sequelize = require("./index");

class Media extends Model {}

Media.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    path: {
      type: DataTypes.STRING,
    },
    file_name: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.ENUM(["video", "image", "file"]),
    },
  },
  {
    sequelize,
    modelName: "Media",
  }
);

Media.belongsTo(Message, {
  foreignKey: "message_id",
  onDelete: "cascade",
});

Message.hasMany(Media, {
  foreignKey: "message_id",
  as: "medias",
});

Media.belongsTo(Comment, {
  foreignKey: "comment_id",
  onDelete: "cascade",
});

Comment.hasMany(Media, {
  foreignKey: "comment_id",
  as: "medias",
});

module.exports = Media;
