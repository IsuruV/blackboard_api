// const Scraper = require('../models/class_info_scraper');
import Scraper from '../models/class_info_scraper';
import User from '../models/user';
import mongoose from 'mongoose';

const userController = {};


db.collection.findAndModify({
  query: { _id: "some potentially existing id" },
  update: {
    $setOnInsert: { foo: "bar" }
  },
  new: true,   // return new doc if one is upserted
  upsert: true // insert the document if it does not exist
})

userController.post = (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  var scraper = new Scraper(username, password);
  scraper.returnRoster().then((classData) => {
    let userName = scraper.data[0].studentName;
    // const user = new User({
    //   user_id:'1',
    //   name: 'bob',
    //   password:'abc123'
    // });
    User.findAndModify({
      query:{name: userName},
      update:{ $setOnInsert:{ name: userName }},
      new: true,
      upsert: true
    })
    
    res.status(200).json({
      success: true,
      data: scraper.rosterLinks
    });
  }).catch((err) => {
    res.status(500).json({
      message: err,
    });
  });

};

export default userController;

// scraper.rosterLinks

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
