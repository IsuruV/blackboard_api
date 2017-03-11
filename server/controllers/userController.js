// const Scraper = require('../models/class_info_scraper');
import Scraper from '../models/class_info_scraper';
import User from '../models/user';
import Class from '../models/class';
import mongoose from 'mongoose';
import pry from 'pryjs';

const userController = {};


userController.post = (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  // check if user exists.
  User.findOne({'userName': username, 'password': password}, (err, result)=> {
    if(!result){
      //if not, scrape blackboard and create user.
        var scraper = new Scraper(username, password);
        scraper.returnRoster().then((classData) => {
        let name = scraper.rosterLinks[0].studentName;
    const user = new User({
      name: name,
      userName: username,
      password: password
    });
    // find or create the classes
    var scrapedClasses = scraper.rosterLinks;
    for(let i=0; i<scraper.rosterLinks.length; i++){
      eval(pry.it);
        Class.findOne({'classId': scraper.rosterLinks[i].class_id},(err,result)=>{
          // if class does not exist create it and add student
          if (!result){
           
            const newClass = new Class({
              className: scraper.rosterLinks[i].className,
              classId: scraper.rosterLinks[i].class_id,
            })
            user.classes.push(newClass);
            newClass.push(user);
            newClass.save((err,result)=>{if (result) console.log('class saved'); });
          }else{
            //else just add the student to the found class
            eval(pry.it);
            result.push(user);
            console.log(err);
          }
        })
        
    }
    
    //
    user.save((err,result)=>{ if (result) console.log('user saved');});
    
    res.status(200).json({
      success: true,
      data: scraper.rosterLinks
    });
  }).catch((err) => {
    res.status(500).json({
      message: err,
    });
  });
  
    }else{
      //otherwise return the existing user
      res.status(200).json({
      success: true,
      data: result
    });
    }
    
  });

};

userController.post = (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  // check if user exists.
  User.findOne({'userName': username, 'password': password}, (err, result)=> {
    if(!result){
      //if not, scrape blackboard and create user.
        var scraper = new Scraper(username, password);
        scraper.returnRoster().then((classData) => {
        let name = scraper.rosterLinks[0].studentName;
    const user = new User({
      name: name,
      userName: username,
      password: password
    });
    user.save((err,result)=>{ if (result) console.log('user saved');});
    callBack(user, scraper, callbackFunc);
  
        });
        
    }else{
      //otherwise return the existing user
      res.status(200).json({
      success: true,
      data: result
    });
    }
    
  });

};


export default userController;


// const  callBack= (user,scraper, callbackFunc)=>{
//   callbackFunc(user, scraper);
// }

// const makeClasses = (user,scraper) =>{
//   eval(pry.it);
//   for(let i=0; i<scraper.rosterLinks.length; i++){
//           Class.findOne({'classId': scraper.rosterLinks[i].class_id},(err,result)=>{
//           // if class does not exist create it and add student
//           if (!result){
//             const newClass = new Class({
//               className: scraper.rosterLinks[i].className,
//               classId: scraper.rosterLinks[i].class_id,
//             })
//             user.classes.push(newClass);
//             newClass.push(user);
//             newClass.save((err,result)=>{if (result) console.log('class saved'); });
            

               
//           }else{
//             //else just add the student to the found class
//             result.push(user);
//             console.log(err);
//           }
//         })
//   }
        
//                         res.status(200).json({
//                 success: true,
//                 data: scraper.rosterLinks
//                 }).catch((err) => {
//                 res.status(500).json({
//                 message: err,
//                 });
//               });
        
// }