const jwt = require('jsonwebtoken');

const secret = 'mysecretshhhh';

const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/login');
  }

  return next();
};

const requiresToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token.startWith('Bearer ')) {
    // Remove bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid.',
        });
      }
      req.decoded = decoded;
      return next();
    });
  }

  return res.json({
    success: false,
    message: 'Auth token is not supplied.',
  });
};

const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/storyboard');
  }

  return next();
};

const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }

  return next();
};

const bypassSecure = (req, res, next) => {
  next();
};

module.exports = {
  requiresLogin,
  requiresLogout,
  requiresToken,
};

if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
