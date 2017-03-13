// require('babel/register')({optional: ['es7']});


import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import routes from './routes';

/*
var mongoLab = 'mongodb://userman:lemons@ds145178.mlab.com:45178/blackboardmessenger'
mongoose.connect(mongoLab, () => {
  console.log('Connected to MongoDB...');
});
*/
///*
mongoose.connect(process.env.IP, () => {
  console.log('Connected to MongoDB...');
});
//*/
const app = express();

// Middleware
app.use(bodyParser.json());

app.use('/api', routes);

export default app;
