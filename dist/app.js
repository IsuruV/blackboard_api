'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel/register')({ optional: ['es7'] });

_mongoose2.default.connect('0.0.0.0', function () {
  console.log('Contected to mongodb...');
});

var app = (0, _express2.default)();

// Middleware
app.use(_bodyParser2.default.json());

app.use('/api', _routes2.default);

exports.default = app;
//# sourceMappingURL=app.js.map