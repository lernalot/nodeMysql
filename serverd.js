var http = require('http');
var url = require('url');
var util = require('util');
var array = [9,10];



var mysql = require('mysql');
var connection = mysql.createConnection({
    host:"localhost",
    user: 'root',
    password:'12345678',
    database:'sys'
});
connection.connect();

//index



// array.map(function(key,index){
//     var addsql = 'INSERT INTO local3306(id,name,age,apple,orange,watermelon) VALUES('+key+',?,?,?,?,?)';
//     var addsqlParams = ["xiaowang"+key,22,19,10,12];
//     connection.query(addsql,addsqlParams, function (error, result) {
//         if (error) {throw error; return;}
//         console.log('INSERT ID:',result);
//     });
//  });


// var mosql = 'UPDATE local3306 SET name=? WHERE id=?';
// var mosqlPara = ['six',6];
// connection.query(mosql,mosqlPara, function (error, result) {
//   if (error) {throw error; return;}
//   console.log('UPDATE affectedRows',result.affectedRows);
// });

// var deSql = 'DELETE FROM local3306 WHERE id = 6';
// connection.query(deSql,function(err,result){
//     if (error) {throw error; return;}
//     console.log('de',result);
// });
var dataResult = {};
var addsql = 'SELECT apple FROM local3306';
var addsqlParams = [6];
connection.query(addsql,function(error,result){
    if(error){ throw error;return;}
    dataResult = JSON.stringify(result);
    console.log(result);
});

var callback =  function (response) {
   var body = '';
   response.on("data",function (data) {
      body += data;
   });
   response.on("end",function () {
      console.log(body);
   });
};


// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
//     res.write(dataResult);
//     res.end();
// }).listen(3088);
var req = http.request(options,callback);
req.end();