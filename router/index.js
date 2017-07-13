const express = require('express')
const router = express.Router()
const setup = require('../models');



router.get('/', function (req, res) {
  res.render('index', {
    title: 'WELCOME'
  })
})

module.exports = router
