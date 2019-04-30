const controllers = require('./controllers');
const middleware = require('./middleware');

const router = (app) => {
  // main api routes
  app.post('/api/login', controllers.Account.login);
  app.post('/api/signup', controllers.Account.signup);
  app.post('/api/changePassword', middleware.requiresToken, controllers.Account.changePassword);
};

module.exports = router;
