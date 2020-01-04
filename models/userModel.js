'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM pp_user');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT user_id, username, email FROM pp_user WHERE user_id = ?;', [id]);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getUserLogin = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM pp_user WHERE username = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const addUser = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO pp_user (username, email, password) VALUES (?, ?, ?);', params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const checkUsername = async (username) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM pp_user WHERE username = ?;', username);
    return rows;
  } catch (e) {
    console.log('username error', e.message)
  }
};

const checkEmail = async (email) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM pp_user WHERE email = ?;', email);
    return rows;
  } catch (e) {
    console.log('email error', e.message)
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  getUserLogin,
  checkUsername,
  checkEmail,
};
