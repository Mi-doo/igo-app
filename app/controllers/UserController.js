const userService = require('../services/UserService');
const { UserForm } = require('../Validation/UserForm');

module.exports.index = async (req, res) => {
  const { users, error } = await userService.getUsers();

  if (error) {
    res.status(500);
    return res.render('errors/500');
  }

  users.push({});

  res.render('user/index', { users });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;

  const { user, error } = await userService.findUser(id);

  if (error) {
    res.status(500);
    return res.render('errors/500');
  }

  if (!user) {
    res.status(404);
    return res.render('errors/404');
  }

  res.render('user/show', { user });
};

module.exports.new = (req, res) => {
  res.render('user/new');
};

module.exports.create = async (req, res) => {
  const messages = new UserForm().submit(req);

  if (messages.errors) {
    res.status(400);
    return res.render('user/new', { user: req.body, errors: messages.errors });
  }

  const { _, error } = await userService.addUser(req.body);

  if (error) {
    res.status(500);
    return res.render('errors/500');
  }

  res.redirect('/users');
};

module.exports.edit = async (req, res) => {
  const { id } = req.params;

  const { user, error } = await userService.findUser(id);

  if (error) {
    res.status(500);
    return res.render('errors/500');
  }

  if (!user) {
    res.status(404);
    return res.render('errors/404');
  }

  res.render('user/edit', { user });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;

  const messages = new UserForm().submit(req);

  const userData = {
    id,
    ...req.body,
  };

  if (messages.errors) {
    res.status(400);
    return res.render('user/edit', { user: userData, errors: messages.errors });
  }

  const { user, error } = await userService.updateUser(id, req.body);

  if (error) {
    res.status(500);
    return res.render('errors/500');
  }

  if (!user) {
    res.status(404);
    return res.render('errors/404');
  }

  res.redirect('/users');
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;

  const { _, error } = await userService.deleteUser(id);

  if (error) {
    res.status(500);
    return res.render('errors/500');
  }

  res.redirect('/users');
};
