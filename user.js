const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/users-db',
  { useMongoClient: true }
);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  status: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
