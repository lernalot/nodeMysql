"use strict";
const http = require('http');
const url = require('url');
const util = require('util');
var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var controller = require("../controller/controller.js");
const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
var dataResult = {};
const connection = mysql.createConnection({
   host:"localhost",
   user: 'root',
   password:'12345678',
   database:'sys'
});
connection.connect();


// var addsql = 'INSERT INTO apple(id,name,age,apple,orange,watermelon) VALUES('+key+',?,?,?,?,?)';
// var addsqlParams = ["xiaowang"+key,22,19,10,12];

var addSql = 'SELECT id,apple,orange FROM information WHERE id = 9';
connection.query(addSql, function (error, result) {
   if (error) {throw error; return;}
   dataResult = JSON.stringify(result);
   controller.dealData(dataResult);
});



