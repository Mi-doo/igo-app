const User = require('../models/UserModel');

module.exports.getUsers = async () => {
  try {
    const users = await User.list();

    return { users, error: null };
  } catch (error) {
    return { users: null, error };
  }
};

module.exports.findUser = async (id) => {
  try {
    const user = await User.find(id);

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

module.exports.addUser = async (userData) => {
  try {
    const user = await User.create(userData);

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

module.exports.updateUser = async (id, userData) => {
  try {
    const user = await User.find(id);

    if (!user) {
      return { user: null, error: null };
    }

    user.update(userData);

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

module.exports.deleteUser = async (id) => {
  try {
    await User.destroy(id);

    return { user: null, error: null };
  } catch (error) {
    return { user: null, error };
  }
};
