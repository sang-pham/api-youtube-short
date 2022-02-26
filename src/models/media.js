const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

class Media extends Model { }

Media.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    file_name: {
      type: DataTypes.STRING,
    },
    path: {
      type: DataTypes.TEXT,
    },
    size: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
    },
    model_id: {
      type: DataTypes.INTEGER
    },
    model_type: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "Media",
    tableName: "media"
  }
);



module.exports = Media;
