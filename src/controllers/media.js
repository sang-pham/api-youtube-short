const { Media } = require("../models")
const fs = require('fs')


const getMedia = async (req, res) => {
  const { mediaId } = req.params
  try {
    const media = await Media.findOne({
      where: {
        id: mediaId,
      },
      attributes: ['path']
    })
    if (!media) {
      return res.status(404).json({ error: 'Image not found' })
    }

    return fs.createReadStream(media.path).pipe(res)

  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = { getMedia }