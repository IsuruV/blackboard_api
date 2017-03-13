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
   
     User.findOne({userName: username, password: password},(err,result)=>{
      if(!result){
        //  const user = new User({});
          var scraper = new Scraper(username, password);
          scraper.returnRoster().then((classData) => {
                let name = scraper.rosterLinks[0].studentName;
                let classes = scraper.rosterLinks;
                const user= new User({
                    name : name,
                    userName: username,
                    password: password
                });
              //create classes
                
                                classes.forEach((classRoom)=>{
                Class.findOne({'classId': classRoom.class_id},(err,result)=>{
                  if(!result){
                     const newClass = new Class({
                      className: classRoom.className,
                      classId: classRoom.class_id,
                      roster: classRoom.students
                    });
                    newClass.students.addToSet(user);
                    newClass.save();
                    // user.classes.push(newClass);
                    // user.save();
                    user.classes.addToSet(newClass);
                    user.save();
           
                    return res.status(200).json({
                        success: true,
                        data: scraper.rosterLinks
                         });
                
                    
                  }else{
                      result.students.addToSet(user);
                      result.save();
                      user.classes.addToSet(result);
                      return user.save().then((savedUser)=>{
                        return savedUser;
                      });
                    console.log('went here')
                      
                  }
                });
              })
            
              });
      }else{
            User.populate(result, { path: 'classes', model: 'Class' }, function (err, user) {
                console.log(user);
                
                    return res.status(200).json({
                      success: true,
                        data: result
                    });
                    
                });
          
      }
     });


};

export default userController;

// { __v: 0,
//   className: '2017 Spring Term (1) Global Ethics PHI 1700 LMFA[30109] (Baruch College)',
//   classId: '_1367616_1',
//   _id: 58c4a7c48f15a338c17238d6,
//   students: [ 58c4a7c48f15a338c17238d5 ] }
// { __v: 0,
//   className: '2017 Spring Term (1) Systems Analysis and Design CIS 4800 CTRA[29913] (Baruch College)',
//   classId: '_1368469_1',
//   _id: 58c4a7c48f15a338c17238d7,
//   students: [ 58c4a7c48f15a338c17238d5 ] }
// { __v: 0,
//   className: '2017 Spring Term (1) Object Oriented Programming I CIS 3100 ETRA[29714] (Baruch College)',
//   classId: '_1367733_1',
//   _id: 58c4a7c48f15a338c17238d8,
//   students: [ 58c4a7c48f15a338c17238d5 ] }