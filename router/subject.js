const express = require('express')
const router = express.Router()
const setup = require('../models');



router.get('/', (req, res) => {
  setup.Subject.findAll({
      order: [['subject_name', 'ASC']],
      // order: [['Teacher', 'first_name', 'ASC']],
      include: [setup.Teacher]
    })
    .then(teach => {
      res.render('subject', {
        dataTcui: teach
      })
    })
})

router.get('/enroll/:id', (req, res) => {
  setup.Bridge.findAll({
      order: [['Student', 'first_name', 'ASC']],
      where: {
        SubjectId: req.params.id
      },
      include: [setup.Student, setup.Subject]
    })
    .then(final => {
      res.render('enrolled', {
        data: final
      })
    })
})

router.get('/enroll/:idsu/scoring/:idst', (req, res) => {
  setup.Bridge.findAll({
      include: [setup.Subject],
      where: {
        SubjectId: req.params.idsu
      }
    })
    .then(teach => {
      res.render('scoring', {
        dataTcui: teach
      })
    })
})

router.post('/enroll/:idsu/scoring/:idst', (req, res) => {
  setup.Bridge.update({
      score: `${req.body.score}`,
      updatedAt: new Date()
    }, {
      where: {
        SubjectId: req.params.idsu
      }
    })
    .then(() => {
      res.redirect(`/subject/enroll/${req.params.idsu}`)
    })
})

module.exports = router
