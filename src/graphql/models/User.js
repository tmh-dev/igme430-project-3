const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

let UserModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  boards: {
    type: [String],
  },

  salt: {
    type: Buffer,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.statics.toAPI = doc => ({
  email: doc.email,
  _id: doc._id,
});

const validatePassword = (doc, password, callback) => {
  const pass = doc.password;

  return crypto.pbkdf2(password, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => {
    if (hash.toString('hex') !== pass) {
      return callback(false);
    }
    return callback(true);
  });
};

UserSchema.statics.findByEmail = (email, callback) => {
  const query = {
    email,
  };

  return UserModel.findOne(query, callback);
};

UserSchema.statics.changePassword = (email, update, callback) => {
  const query = {
    email,
  };

  UserModel.findOneAndUpdate(query, update, callback);
};

UserSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => callback(salt, hash.toString('hex')));
};

UserSchema.statics.authenticate = (email, pass, cb) => UserModel.findByEmail(email, (err, doc) => {
  if (err) {
    return cb(err);
  }

  if (!doc) {
    return cb();
  }

  return validatePassword(doc, pass, (result) => {
    if (result === true) {
      return cb(null, doc);
    }

    return cb();
  });
});


UserModel = mongoose.model('Account', UserSchema);

module.exports = UserModel;
