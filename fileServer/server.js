'use strict';
var url = require('url');

var fs = require('fs');

var path = require('path');

var mime = require('./mime');

function processRequest(request,response){
    var requestUrl = request.url;
    var pathName = url.parse(requestUrl).pathname;
    var pathName = decodeURI(pathName);
    if (!pathName.endsWith('/') && path.extname(pathName) === '') {

        pathName += '/';
        var redirect = "http://" + request.headers.host + pathName;
        response.writeHead(301, {
            location: redirect
        });
        //response.end方法用来回应完成后关闭本次对话，也可以写入HTTP回应的具体内容。
        response.end();
    };

    var filePath = path.resolve(__dirname+pathName);
    console.log(filePath);
    var ext = path.extname(pathName);
    ext = ext ? ext.slice(1) : 'unknown';
    //未知的类型一律用"text/plain"类型
    var contentType = mime[ext] || "text/plain";

    fs.stat(filePath,function(err,stats){
        if (err) {
            response.writeHead(404, { "content-type": "text/html" });
            response.end("<h1>404 Not Found</h1>");
        };
        if(!err && stats.isFile()){
            response.writeHead(200,{"content-type":contentType});
            var stream = fs.createReadStream(filePath);
            stream.on('error', function() {

                response.writeHead(500, { "content-type": contentType });

                response.end("<h1>500 Server Error</h1>");

            });
            //读取文件
            stream.pipe(response);
        };
        if (!err && stats.isDirectory()) {

            var html = " <head><meta charset = 'utf-8'/></head>";
            //读取该路径下文件
            fs.readdir(filePath, (err, files) => {
                if (err) {
                    console.log("读取路径失败！");
                } else {

                    // files.foreach(function (file) {
                    // //做成一个链接表，方便用户访问
                    // html+=`<div><a href="${file}">${file}</a></div>`;
                    //  });

                    for (var file of files) {
                        if (file === "index.html") {

                            response.writeHead(200, { "content-type": "text/html" });
                            response.end(file);

                            break;
                        };
                        html += `<div><a href='${file}'>${file}</a></div>`;
                        console.log(html);

                    }
                    response.writeHead(200, { "content-type": "text/html" });
                    response.end(html);
                };

            });


        };

    });
}

module.exports = processRequest;