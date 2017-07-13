const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

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


app.use('/teacher', routeteacher);
app.use('/subject', routesubject);
app.use('/student', routestudent);
app.use('/', index)





app.listen(3000);
