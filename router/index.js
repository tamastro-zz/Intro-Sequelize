const express = require('express')
const router = express.Router()
const setup = require('../models');
const crypto = require('crypto');
const random = require('../views/helper/randomizer');



router.get('/', function (req, res) {
  res.render('indexH', {
    title: 'WELCOME'
  })
})

router.get('/signup', (req, res) => {
  setup.user.findAll()
    .then(regis => {
      res.render('signup', {
        regis: regis
      })
    })
})

router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.send('field must not be empty')
  }
  else {
    setup.user.findOne({
        where: {
          username: req.body.username
        }
      })
      .then(rows => {
        if (!rows) {
          setup.user.create({
              username: `${req.body.username}`,
              password: `${req.body.password}`,
              role: `${req.body.role}`,
              createdAt: new Date(),
              updatedAt: new Date()
            })
            .then(() => {
              res.redirect('/')
            })
        }
        else {
          res.send('username sudah ada');
        }
      })
  }
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
    res.send('form incomplete')
  }
  else {
    setup.user.findOne({
        where: {
          username: req.body.username
        }
      })
      .then(rows => {
        var saltUserLogin = rows.salt
        var passwordUserLogin = req.body.password
        var getPasswordUser = random.hashish(passwordUserLogin, saltUserLogin)
        if (rows.password == getPasswordUser) {
          req.session.user = {
            username: req.body.username,
            role: rows.role
          }
          res.redirect('/homepage')
        }
        else {
          res.send('password salah')
        }
      })
      .catch(err => {
        res.send('Theres No Such Username')
      })
  }
})

// batas bebas
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
    role: req.session.user.role,
    name: req.session.user.username
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
