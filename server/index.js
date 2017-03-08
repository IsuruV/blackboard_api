// require('node_modules/babel-register')({optional: ['es7']});

import app from './app';
// require ('./app');
// app.listen(process.env.PORT, () => {
//   console.log('Running on port 3000...');
// });

app.listen(process.env.PORT, process.env.IP);

// npm run clean && mkdir dist && babel server -s -d dist