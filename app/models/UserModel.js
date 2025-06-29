const Model = require('igo').Model;

const schema = {
  table: 'users',
  columns: ['id', 'first_name', 'last_name', 'email', 'created_at'],
};

class User extends Model(schema) {
  constructor(values) {
    super(values);
  }
}

module.exports = User;
