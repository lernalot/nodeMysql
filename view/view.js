'use strict';
const http = require("http");
// var express = require("express");
// var app = express.createServer();


module.exports = {
   viewIndex:function (dataResult) {
      http.createServer(function (req,res) {
         res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
         res.write(dataResult);
         res.end();
      }).listen(3088);
   }
}