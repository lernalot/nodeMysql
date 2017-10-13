"use strict";//https://github.com/alsotang/node-lessons
var express = require('express');
var cheerio = require('cheerio');//分析网页 https://github.com/cheeriojs/cheerio
var superagent = require('superagent');//抓取网页内容 http://visionmedia.github.io/superagent/ 链式调用，prototype
//https://cnodejs.org/topic/58ad76db7872ea0864fedfcc
//https://www.v2ex.com/t/396066#reply2
var app = express();

app.get('/',function (req,res,next) {
   superagent.get('http://www.cocos.com/docs/js/3-jumping-into-cocos2d-js/3-1-installation/zh.html')
      .end(function (err,sres) {
         if(err){
            return err;
         }
         var $ = cheerio.load(sres.text);
         var items = [];
         $(".sidebar-header-3 a").each(function (idx,element) {
            var $element = $(element);
            console.log($element);
            items.push({
               "href":$element.attr("href"),
               "text":$element.text()
            });
         });
         res.send(items);
      });
});
app.listen(3000, function () {
   console.log('app is listening at port 3000');
});
