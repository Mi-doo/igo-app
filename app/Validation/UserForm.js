const { Form } = require('igo');
const User = require('../models/UserModel');

class UserForm extends Form(User) {
  validate(req) {
    req.checkBody('first_name', 'First name should not be empty').notEmpty();
    req.checkBody('last_name', 'Last name should not be empty').notEmpty();
    req.checkBody('email', 'Email should be valid').isEmail().notEmpty();
  }
}

module.exports.UserForm = UserForm;
