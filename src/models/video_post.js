const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

class VideoPost extends Model { }

VideoPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    caption: {
      type: DataTypes.TEXT,
    },
    video_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: "VideoPost",
    tableName: "video_posts"
  }
);


module.exports = VideoPost;
