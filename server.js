var express = require('express');
  var morgan = require('morgan');
 var path = require('path');
 
  var app = express();
  app.use(morgan('combined'));
  
  app.get('/', function (req, res) {
   res.sendFile('./app/index.html');
   res.sendFile(path.join(__dirname, 'index.html'));
  });
  
 app.listen(80, function () 
 app.listen(8080, function () {
    console.log('IMAD course app listening on port 80!');
  });