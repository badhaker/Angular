var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');/////////////
var cors = require('cors');//////////////
////////////////////////////////////routing 1.0/////////////////////////////////////////////////////

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
const { captureRejectionSymbol } = require('events');


var app = express();
///////////// create  connection using mongodb 
mongoose.connect("mongodb://localhost:27017/Register", {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if(err)
  console.error(err)
  else
  console.info("Your Database Connected successfully");
});

// mongoose.connect('mongodb://localhost:27017/Register');
// mongoose.connection.on('connected',()=>{
//   console.log('Database connected');
// });
// mongoose.connection.on('error',(err)=>{
//   if(err)
//   console.error(err)
//   else
//   console.info("Your Database Connected successfully");
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

////////////////////////////////////routing 2.0/////////////////////////////////////////////////////
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
