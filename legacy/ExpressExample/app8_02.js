var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');


var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 1337);
app.use(static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var router = express.Router();

router.route('/process/login/:name').post(function(req, res) {
  console.log('/process/login/:name 라우팅 함수에서 받음.');

  var paramName = req.params.name;

  var paramID = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
  res.write("<h1>서버에서 로그인 응답</h1>");
  res.write("<div><p>" + paramName + "</p></div>");
  res.write("<div><p>" + paramID + "</p></div>");
  res.write("<div><p>" + paramPassword + "</p></div>");
  res.end();
})

app.use('/', router);

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log("Express로 웹 서버 실행됨.: " + app.get('port'));
});
