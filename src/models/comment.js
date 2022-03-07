const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    indexes: [
      {
        fields: ["parent_id"],
      },
    ],
  }
);

module.exports = Comment;
