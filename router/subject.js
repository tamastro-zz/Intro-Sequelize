const express = require('express')
const router = express.Router()
const setup = require('../models');



router.get('/', (req, res) => {
  setup.Subject.findAll()
    .then(teach => {
      res.render('subject', {
        dataTcui: teach
      })
    })
})

module.exports = router
