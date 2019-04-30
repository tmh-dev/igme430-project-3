const jwt = require('jsonwebtoken');
const models = require('../models');

const secret = process.env.JWT_SECRET || 'mysecretshhhh';

const { Account } = models;

const login = (request, response) => {
  const req = request;
  const res = response;

  // force cast to strings to cover some security flaws
  const email = `${req.body.email}`;
  const password = `${req.body.password}`;
  console.dir({ email, password });
  if (!email || !password) {
    return res.status(401).json({
      error: 'All fields are required.',
    });
  }

  return Account.AccountModel.authenticate(email, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({
        error: 'Invalid username or password',
      });
    }

    const accountId = Account.AccountModel.toAPI(account)._id;
    const payload = { email };
    const token = jwt.sign(payload, secret, {
      expiresIn: '1h',
    });
    console.dir('hit');
    return res.status(200).json({
      success: true,
      messsage: 'Authentication Successful',
      email,
      id: accountId,
      token,
    });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings to cover up some security flaws
  req.body.email = `${req.body.email}`;
  req.body.pass1 = `${req.body.pass1}`;
  req.body.pass2 = `${req.body.pass2}`;


  if (!req.body.email || !req.body.pass1 || !req.body.pass2) {
    return res.status(400).json({
      error: 'All fields are required.',
    });
  }

  if (req.body.pass1.trim() !== req.body.pass2.trim()) {
    return res.status(400).json({
      error: 'Passwords do not match.',
    });
  }

  return Account.AccountModel.generateHash(req.body.pass1, async (salt, hash) => {
    const accountData = {
      email: req.body.email,
      salt,
      password: hash,
    };

    const account = new Account.AccountModel(accountData);

    try {
      await account.save();

      const accountId = Account.AccountModel.toAPI(account)._id;

      const payload = { email: req.body.email };
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h',
      });
      res.status(200).json({
        success: true,
        messsage: 'Authentication Successful',
        email: accountData.email,
        id: accountId,
        token,
      });
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({
          error: 'Email already in use.',
        });
      }
    }
    return res.status(400).json({
      error: 'An error occurred',
    });
  });
};

const changePassword = (request, response) => {
  const req = request;
  const res = response;

  req.body.pass1 = `${req.body.pass1}`;
  req.body.pass2 = `${req.body.pass2}`;
  req.body.id = `${req.body.id}`;

  if (!req.body.pass1 || !req.body.pass2) {
    return res.status(400).json({
      error: 'All fields are required.',
    });
  }

  if (req.body.pass1.trim() !== req.body.pass2.trim()) {
    return res.status(400).json({
      error: 'Passwords do not match.',
    });
  }

  return Account.AccountModel.generateHash(req.body.pass1, async (salt, hash) => {
    const update = {
      password: hash,
      salt,
    };
    
    Account.AccountModel.findByIdAndUpdate(req.body.id, update);
  });
};


module.exports = {
  login,
  signup,
  changePassword,
};
