'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


_mongoose2.default.Promise = global.Promise;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [5, 'Username must be 5 characters or more.']
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be 8 characters or more.']
  }
});

// Write some encrption for Password

var User = _mongoose2.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map