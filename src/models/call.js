const { DataTypes, Model } = require("sequelize");
const sequelize = require("./dbInstance");

class Call extends Model { }

Call.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(["missed", "called"]),
    },
    type: {
      type: DataTypes.ENUM(["video, audio"])
    }
  },
  {
    sequelize,
    modelName: "Call",
  }
);


module.exports = Call;
