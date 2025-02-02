var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var planetRouter = require('./routes/planet');
var app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// mongodb setup
const uri = "mongodb://mongouser:planetaria@testing-shard-00-00.faevt.mongodb.net:27017,testing-shard-00-01.faevt.mongodb.net:27017,testing-shard-00-02.faevt.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-pmlxft-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongodb')
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/planet', planetRouter);
app.use(express.static(__dirname + '/pgen'));
app.use(express.static(__dirname + '/pgen/src'));

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
