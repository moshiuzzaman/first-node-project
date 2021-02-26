var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// require all routes from routes folder
var indexRouter = require('./routes/index');
var singUpRouter = require('./routes/singUp');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logOut');
var productsRouter = require('./routes/products');
var addProductsRouter = require('./routes/addProducts');
var orderRouter = require('./routes/order');
var pendingOrderRouter = require('./routes/pendingOrders');
var allOrderRouter = require('./routes/allOrders');
var editOrderStatusRouter = require('./routes/editOrderStatus');
var updateUserRouter = require('./routes/updateUser');
var deleteUserRouter = require('./routes/deleteUser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set all api
app.use('/', indexRouter);
app.use('/sing-up', singUpRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/products', productsRouter);
app.use('/add-products', addProductsRouter);
app.use('/order', orderRouter);
app.use('/orders/pending', pendingOrderRouter);
app.use('/all-orders', allOrderRouter);
app.use('/order/edit-status', editOrderStatusRouter);
app.use('/users/update-user', updateUserRouter);
app.use('/users/delete-user', deleteUserRouter);

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
