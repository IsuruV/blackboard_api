'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class_info_scraper = require('../models/class_info_scraper');

var _class_info_scraper2 = _interopRequireDefault(_class_info_scraper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userController = {}; // const Scraper = require('../models/class_info_scraper');


userController.post = function (req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  console.log(req.body);
  var scraper = new _class_info_scraper2.default(username, password);
  scraper.returnRoster().then(function (classData) {
    res.status(200).json({
      success: true,
      data: scraper.rosterLinks
    });
  }).catch(function (err) {
    res.status(500).json({
      message: err
    });
  });
};

exports.default = userController;

// var p1 = new Promise(
//     // The resolver function is called with the ability to resolve or
//     // reject the promise
//     function(resolve, reject) {
//         var scraper = new Scraper('isuru0123', '509973006');
//         scraper.getClasses();
//     }
// );


// var p1 = new Promise(
//     // The resolver function is called with the ability to resolve or
//     // reject the promise
//   (resolve, reject)=>{
//         var scraper = new Scraper('isuru0123', '509973006');
//         return resolve(scraper.getClasses());
//     }
// );
//# sourceMappingURL=userController.js.map