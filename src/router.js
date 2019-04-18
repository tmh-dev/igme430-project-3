const controllers = require('./controllers');
const middleware = require('./middleware');

const router = (app) => {
  // main api routes
  app.post('/api/login', controllers.Account.login);
  app.post('/api/signup', controllers.Account.signup);
  app.post('/api/changePassword', middleware.requiresToken, controllers.Account.changePassword);
  // app
  app.post('/api/makeStory', middleware.requiresToken, controllers.Story.makeStory);
  app.delete('/api/deleteStory', middleware.requiresToken, controllers.Story.deleteStory);
  app.get('/api/getStories', middleware.requiresToken, controllers.Story.getStories);

  // TODO: nest stories into boards
  // app.post('/api/makeBoard', middleware.requiresLogin, controllers.Board.makeBoard);
  // app.get('/api/getBoards', middleware.requiresLogin, controllers.Board.getBoards);
  // app.delete('/api/deleteBoard', middleware.requiresLogin, controllers.Board.deleteBoard);
};

module.exports = router;
