const express = require('express')
const router = express.Router()
const db = require('../models');



router.get('/', (req, res) => {
  db.Student.findAll()
    .then(teach => {
      res.render('student', {
        dataTcui: teach
      })
    })
})

// router.post('/', (req, res) => {
//
// })

router.get('/add', (req, res) => {
  db.Student.findAll()
    .then(teach => {
      res.render('add', {
        dataTcui: teach
      })
    })
})

router.post('/add', (req, res) => {
  db.Student.create({
      first_name: `${req.body.depan}`,
      last_name: `${req.body.belakang}`,
      email: `${req.body.email}`,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(() => {
      res.redirect('/student')
    })
    .catch(() => {
      db.Student.findAll()
        .then(teach => {
          res.render('add', {
            dataTcui: teach,
            err: err
          })
        })
    })
})

router.get('/edit/:id', (req, res) => {
  db.Student.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(teach => {
      res.render('edit', {
        dataTcui: teach
      })
    })
})

router.post('/edit/:id', (req, res) => {
  db.Student.update({
      first_name: `${req.body.depan}`,
      last_name: `${req.body.belakang}`,
      email: `${req.body.email}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/student')
    })
    .catch(() => {
      res.redirect(`/student/edit/${req.params.id}`)
    })
})

router.get('/delete/:id', (req, res) => {
  db.Student.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.redirect('/student')
    })
})


module.exports = router
