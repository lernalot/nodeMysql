'use strict';
var view = require("../view/view.js");
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}
// exports.dealData = function(res) {
//    viewIndex(res);
//    console.log(res);
// }
module.exports = {
   dealData:function(res) {
      view.viewIndex(res);
      view.renderHtml();
   }
};
