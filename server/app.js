// require('babel/register')({optional: ['es7']});


import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import routes from './routes';

mongoose.connect(process.env.IP, () => {
  console.log('Contected to mongodb...');
});

const app = express();

// Middleware
app.use(bodyParser.json());

app.use('/api', routes);

export default app;
