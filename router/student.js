const express = require('express')
const router = express.Router()
const db = require('../models');



router.get('/', (req, res) => {
  db.Student.findAll({
      order: [['first_name', 'ASC']]
    })
    .then(teach => {
      res.render('student', {
        dataTcui: teach,
        role: req.session.user.role,
        name: req.session.user.username
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
        dataTcui: teach,
        err: '',
        role: req.session.user.role,
        name: req.session.user.username
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
    .catch((err) => {
      res.render('/student/add', (erra => {
        errs = err
      }))
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
        dataTcui: teach,
        role: req.session.user.role,
        name: req.session.user.username
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

router.get('/addsubject/:id', (req, res) => {
  db.Student.findAll({
      include: [db.Subject],
      where: {
        id: req.params.id
      }
    })
    .then(teach => {
      db.Subject.findAll({
          include: [db.Student]
        })
        .then(sub => {
          console.log(teach);
          res.render('SubStudent', {
            dataTcui: teach,
            subs: sub,
            role: req.session.user.role,
            name: req.session.user.username
          })
        })
    })
})

router.post('/addsubject/:id', (req, res) => {
  db.Bridge.create({
      StudentId: req.params.id,
      SubjectId: `${req.body.subId}`,
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
})

module.exports = router
