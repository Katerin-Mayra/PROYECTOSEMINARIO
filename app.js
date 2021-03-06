var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var restauranteRouter = require('./routes/restaurante');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/1.0', indexRouter);
app.use('/api/1.0', userRouter);
app.use('/api/1.0', restauranteRouter);

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
var port =8000;
app.listen(port,()=>{
  console.log("Corriendo "+ port);
});
module.exports = app;

// COMANDOS BASICOS
/* 
  docker-compose up
  docker-compose stop
  docker ps
*/

//1. INSTALAR MONGOSE  base de datos
/*
//ir a terminal introducir el siguiente comando mas el CONTAINER ID para que se instale destro del contenedor de la api proyecto_app
  c7e7e7a7bbbe ejemplo de id container
  
  docker exec -it c7e7e7a7bbbe npm install mongoose
*/
//2. INSTALAR SHA1  para desifrar contra pero yo no cifre la contra aun
/*
//ir a terminal introducir el siguiente comando mas el CONTAINER ID para que se instale destro del contenedor de la api proyecto_app
//c7e7e7a7bbbe ejemplo de id container
 sudo docker exec -it  c7e7e7a7bbbe npm intall sha1

*/
 