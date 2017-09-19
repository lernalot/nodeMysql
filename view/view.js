'use strict';
const http = require("http");
const fs = require("fs");
const url = require("url");
// var express = require("express");
// var app = express.createServer();


module.exports = {
   viewIndex:function (dataResult) {
      http.createServer(function (req,res) {
         res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
         res.write(dataResult);
         res.end();
      }).listen(3088);
   },
   renderHtml(){
      http.createServer( function (request, response) {
         // 解析请求，包括文件名
         var pathname = url.parse(request.url).pathname;

         // 输出请求的文件名
         console.log("Request for " + pathname + " received.");

         // 从文件系统中读取请求的文件内容
         fs.readFile('../view/index.htm', function (err, data) {
            if (err) {
               console.log(err);
               // HTTP 状态码: 404 : NOT FOUND
               // Content Type: text/plain
               response.writeHead(404, {'Content-Type': 'text/html'});
            }else{
               // HTTP 状态码: 200 : OK
               // Content Type: text/plain
               response.writeHead(200, {'Content-Type': 'text/html'});

               // 响应文件内容
               console.log(data);
               response.write(data.toString());
            }
            //  发送响应数据
            response.end();
         });
      }).listen(8081);
   }
};