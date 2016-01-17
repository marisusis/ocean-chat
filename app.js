var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var mongoose = require('mongoose');
var session      = require('express-session');

mongoose.connect('mongodb://localhost:27017/Site');

var app = express();

require('./config/passport')(passport);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',require('./routes/index'));
app.use('/user',require('./routes/user.js'));

var server = http.createServer(app);

server.listen(8080);