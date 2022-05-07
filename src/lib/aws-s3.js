const appConst = require("../constants");
const AWS = require("aws-sdk");

const ID = appConst.s3Key.keyID;
const SECRET = appConst.s3Key.keySecret;
const BUCKET_NAME = "mobilehihi";
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

module.exports = {
  ID,
  SECRET,
  BUCKET_NAME,
  s3,
};
