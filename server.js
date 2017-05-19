var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var requireDir = require('require-dir');
var testRoutes = require('./test/api');
var routes = requireDir('./routes');
var _ = require('lodash');
var connection = require('./config/dbConnection');
var crone = require('./crone');

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  next();
});

var port = process.env.PORT || 3000;
// connection.init();
app.use(cookieParser());
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static assets normally
app.use(express.static(__dirname));

app.use('/tests', testRoutes);

_.forEach(routes, function(value){
  app.use('/', value);
});



app.use(express.static(__dirname + '/app'));

app.get('/',function(req,res){
    res.sendFile('index.html',{'root': __dirname + '/app'});
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
module.exports = app;
