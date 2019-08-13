"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = 3000;
var host = '0.0.0.0';
var app = (0, _express["default"])();
app.get('/', function (req, res) {
  res.send('Wesh\n');
});
app.listen(port, host);
console.log("Running on https://".concat(host, ":").concat(port, " !"));