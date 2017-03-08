// const Scraper = require('../models/class_info_scraper');
import Scraper from '../models/class_info_scraper';
import User from '../models/user';
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

export default userController;
