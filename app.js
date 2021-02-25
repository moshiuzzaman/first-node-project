var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var singUpRouter = require('./routes/singup');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logOut');
var productsRouter = require('./routes/products');
var addProductsRouter = require('./routes/addProducts');
var orderRouter = require('./routes/order');
var pendingOrderRouter = require('./routes/pandingOrders');
var allOrderRouter = require('./routes/allOrders');
var editOrderStatusRouter = require('./routes/editOrderStatus');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/singup', singUpRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/products', productsRouter);
app.use('/addProducts', addProductsRouter);
app.use('/order', orderRouter);
app.use('/orders/pending', pendingOrderRouter);
app.use('/allorders', allOrderRouter);
app.use('/order/editstatus', editOrderStatusRouter);

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
