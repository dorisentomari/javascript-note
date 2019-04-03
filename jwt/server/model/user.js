const mongoose = require('mongoose');
const {DB_URL} = require('../config');

mongoose.connect(DB_URL, {useNewUrlParser: true});

mongoose.Promise = global.Promise;

mongoose.set('debug', true);

mongoose.connect(DB_URL, {useNewUrlParser: true});

mongoose.connection.on('error', () => {
  console.log(`MongoDB Connected error...`);
});

mongoose.connection.on('disconnected', () => {
  console.log(`MongoDB Disconnected...`);
});

mongoose.connection.once('open', () => {
  console.log(`MongoDB Connected Successfully...`);
});

let UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);
