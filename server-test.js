const express = require('express');
var app = express();
app.use('/', express.static('ui'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Version, Access-Control-Allow-Origin, Authorization, Origin, X-Requested-With, Content-Type, Accept, ETag, Cache-Control, If-None-Match");
  res.header("Access-Control-Expose-Headers", "Etag, Authorization, Origin, X-Requested-With, Content-Type, Accept, If-None-Match, Access-Control-Allow-Origin");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE, OPTIONS");
  next();
});
app.listen(8001, '127.0.0.1', function() {
  console.log('test server started');
});
