const express = require('express')
const router = express.Router()
const setup = require('../models');



router.get('/', (req, res) => {
  setup.Teacher.findAll()
    .then(teach => {
      res.render('teacher', {
        dataTcui: teach
      })
    })
})

module.exports = router
