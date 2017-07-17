const express = require('express')
const router = express.Router()
const setup = require('../models');



router.get('/', function (req, res) {
  res.render('indexH', {
    title: 'WELCOME'
  })
})



router.get('/login', function (req, res) {
  res.render('indexlogin', {
    title: 'SIGN IN',
    success: req.session.success,
    errors: req.session.errors
  });
  req.session.errors = null;
  req.session.success = null;
})

router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.send('must enter something')
  }
  else {
    setup.user.findOne({
        where: {
          username: req.body.username
        }
      })
      .then(rows => {
        if (rows.password == req.body.password) {
          req.session.user = {
            username: req.body.username,
            role: rows.role,
            name: req.session.user.username
          }
          console.log(req.session.user);
          res.redirect('/homepage')
        }
        else {
          res.send('password salah')
        }
      })
      .catch(err => {
        res.send('there is no such username')
      })
  }
})


router.use((
  req,
  res,
  next
) => {
  if (req.session.user) {
    next();
  }
  else {
    res.sendStatus(403);
  }
})

router.get('/homepage', function (req, res) {
  res.render('index', {
    title: 'WELCOME',
    role: req.session.user.role
  })
})

module.exports = router
