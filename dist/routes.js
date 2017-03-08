'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('./controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _basicController = require('./controllers/basicController');

var _basicController2 = _interopRequireDefault(_basicController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express2.default)();

// Controller Imports
;
// User Routes
routes.get('/', _basicController2.default.get);

routes.post('/users/sign_in', _userController2.default.post);

exports.default = routes;
//# sourceMappingURL=routes.js.map