// Define your Express routes here
// Check http://expressjs.com/fr/guide/routing.html for documentation
const WelcomeController = require('./controllers/WelcomeController');
const UserController = require('./controllers/UserController');

//
module.exports.init = (app) => {
  app.get('/', WelcomeController.index);

  ///User:
  //views:
  app.get('/users/new', UserController.new);
  app.get('/users', UserController.index);
  app.get('/users/:id', UserController.show);
  app.get('/users/:id/edit', UserController.edit);

  //actions:
  app.post('/users/new', UserController.create);
  app.put('/users/:id/edit', UserController.update);
  app.delete('/users/:id', UserController.delete);
};
