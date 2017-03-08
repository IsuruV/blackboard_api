"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nightmare = require('nightmare');
var nightmare = new Nightmare();

var ClassInfoScraper = function () {
  function ClassInfoScraper(userName, passWord) {
    _classCallCheck(this, ClassInfoScraper);

    this.userName = userName;
    this.passWord = passWord;
    this.rosterLinks = [];
    this.index = 0;
  }

  _createClass(ClassInfoScraper, [{
    key: "returnRoster",
    value: function returnRoster() {
      var _this = this;

      this.getClasses();
      return new Promise(function (resolve, reject) {
        //hacksh but it works, will wait 20 secs, hopefully enough time to be done scraping.
        setTimeout(function () {
          resolve(_this.rosterLinks);
        }, 20000);
      });
    }
  }, {
    key: "getClasses",
    value: function getClasses() {
      var _this2 = this;

      nightmare.goto("https://bbhosted.cuny.edu/webapps/login/?userid=" + this.userName + "&password=" + this.passWord).wait(1000).screenshot("bb6.png").evaluate(function () {
        var classes = document.querySelectorAll('#_4_1termCourses_noterm ul.coursefakeclass a');
        console.log(classes);
        var studentName = document.querySelector("#global-nav-link").innerHTML.match(/\>(.*)\<span id=/).pop();
        console.log(studentName);
        var arr = [];
        for (var i = 0; i < classes.length; i++) {
          if (classes[i].href.match(/\id=(.*)\&url/)) {
            var extract = classes[i].href.match(/\id=(.*)\&url/).pop();
            var className = classes[i].innerHTML;
            arr.push({ 'class_id': extract, 'studentName': studentName, 'className': className });
          }
        }
        return arr;
        console.log(arr);
      }).then(function (links) {
        _this2.rosterLinks = links;
        console.log(links);
        nightmare.wait(1000).then(function (links) {
          _this2.runNext(_this2.index);
        });
      });
    }
    // `https://bbhosted.cuny.edu/webapps/blackboard/execute/searchRoster?courseId=${this.rosterLinks[i].id}&course_id=${this.rosterLinks[i].id}&action=search&userInfoSearchKeyString=FIRSTNAME&userInfoSearchOperatorString=Contains&userInfoSearchText=`

  }, {
    key: "runNext",
    value: function runNext(i) {
      var _this3 = this;

      nightmare.goto("https://bbhosted.cuny.edu/webapps/blackboard/execute/displayEmail?navItem=email_select_students&course_id=" + this.rosterLinks[i].class_id).wait(1000).screenshot(this.rosterLinks[i].class_id + "WORKED.png").evaluate(function () {
        var students = [];
        // var studentRoster = document.querySelectorAll('#listContainer_databody tr');
        var studentRoster = document.querySelectorAll('#USERS_AVAIL  option');
        console.log(studentRoster);
        // for(var z=0; z<studentRoster.length;z++){
        //   var firstName = studentRoster[z].children[1].innerHTML.replace(/\s/g, '');
        //   var lastname = studentRoster[z].children[0].children[0].innerHTML.replace(/\<(.*)\>/,"").replace(/\s/g, '');
        //   var fullName = firstName + " " + lastname;
        //   students.push(fullName);
        // }
        for (var z = 0; z < studentRoster.length; z++) {
          var name = studentRoster[z].innerHTML;
          students.push(name);
        }
        return students;
      }).then(function (students) {
        _this3.rosterLinks[_this3.index]['students'] = students;
        _this3.index++;

        // only run next search when we successfully get here
        if (_this3.index < _this3.rosterLinks.length) {
          _this3.runNext(_this3.index);
        } else {
          console.log(_this3.rosterLinks);
          console.log("End");
          nightmare.halt();
        }
      }).catch(function (error) {
        console.error('Search failed:', error);
      });
    }
  }]);

  return ClassInfoScraper;
}();

exports.default = ClassInfoScraper;
// var scrapper = new ClassInfoScraper('isuru0123','509973006');
// scrapper.getClasses();
// {"username":"mmalek1421","password": "Gleo1421"}
// "start": "nodemon bin/dev"
//# sourceMappingURL=class_info_scraper.js.map