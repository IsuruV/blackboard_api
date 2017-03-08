'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('node_modules/babel-register')({ optional: ['es7'] });

// require ('./app');
// app.listen(process.env.PORT, () => {
//   console.log('Running on port 3000...');
// });

_app2.default.listen(process.env.PORT, process.env.IP);

// npm run clean && mkdir dist && babel server -s -d dist
//# sourceMappingURL=index.js.map