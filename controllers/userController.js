'use strict';
const userModel = require('../models/userModel');

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  await res.json(users);
};

const user_get = async (req, res) => {
  const user = await userModel.getUser(req.params.id);
  await res.json(user[0]);
};

module.exports = {
  user_list_get,
  user_get,
};



