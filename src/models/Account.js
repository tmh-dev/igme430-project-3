const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

let AccountModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

const AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    // match: /^[A-Za-z0-9_\-.]{1,16}$/,
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

AccountSchema.statics.toAPI = doc => ({
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

AccountSchema.statics.findByEmail = (email, callback) => {
  const search = {
    email,
  };

  return AccountModel.findOne(search, callback);
};

AccountSchema.statics.changePassword = (id, update, callback) => {
  AccountModel.findByIdAndUpdate(id, update, callback);
};

AccountSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => callback(salt, hash.toString('hex')));
};

AccountSchema.statics.authenticate = (email, pass, cb) => AccountModel.findByEmail(email, (err, doc) => {
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


AccountModel = mongoose.model('Account', AccountSchema);

module.exports = {
  AccountModel,
  AccountSchema,
};
