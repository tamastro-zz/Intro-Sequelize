const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const valid = require('express-validator');
const crypto = require('crypto');


//router
var routeteacher = require('./router/teacher');
var routesubject = require('./router/subject');
var routestudent = require('./router/student');
var index = require('./router/index');


//intiatior
// var db = new setup('./db/data.db');
var app = express();


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(valid())
app.use(session({
  secret: 'sag',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))


app.use('/', index)




app.use((
  req,
  res,
  next
) => {
  if (req.session.user.role == 'student' || 'teacher' || 'headmaster') {
    next()
  }
  else {
    res.sendStatus(403);
  }
})
app.use('/student', routestudent);
app.use((
  req,
  res,
  next
) => {
  if (req.session.user.role == 'teacher' || 'headmaster') {
    next()
  }
  else {
    res.sendStatus(403);
  }
})
app.use('/subject', routesubject);
app.use((
  req,
  res,
  next
) => {
  if (req.session.user.role == 'headmaster') {
    next()
  }
  else {
    res.sendStatus(403);
  }
})
app.use('/teacher', routeteacher);







app.listen(process.env.PORT || 3000);
