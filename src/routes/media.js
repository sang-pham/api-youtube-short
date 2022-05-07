const { Router } = require('express')
const { getMedia } = require('../controllers')
const router = Router()


router.route('/:mediaId')
  .get(getMedia)

module.exports = router