const { Media } = require("../models")
const fs = require('fs')
const { bufferToStream } = require("../lib")

const saveMedia = async ({ file, foreign, storage, type }) => {
  const path = `./src/public/${storage}`
  const writeStream = fs.createWriteStream(path)
  const fileStream = bufferToStream(file.data)
  fileStream.pipe(writeStream)

  const media = await Media.create({
    path,
    size: file.size,
    type,
    ...foreign
  });

  media.url = `${process.env.STORAGE_URL}/api/media/${media.id}`;
  await media.save();

  return media;
}

module.exports = { saveMedia }
