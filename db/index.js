const mongoose = require('mongoose');
const scripts = require('../backgroundScripts');

const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

let uri = '';
// if (process.env.NODE_ENV !== 'production') {
//   uri = 'mongodb://localhost:27017/cc-scheduler';
// } else {
uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.dyijv.mongodb.net/?retryWrites=true&w=majority`;
// }

require('./models');

exports.connectDb = () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log('successfully connected to database');
      startBackgroundScripts();
    })
    .catch((err) => {
      console.log('database connection failed. exiting now...');
      console.log(err);
      process.exit(1);
    });
}

startBackgroundScripts = async () => {
  // scripts.generateMatches.startScripts();
}
