'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();


const getUserLikes = async (params) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM pp_likes WHERE username = ?;', params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const addLikes = async (params) => {
  try {
    const [rows] = await promisePool.execute('INSERT INTO pp_likes (pic_id, username) VALUES (?, ?);', params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const updateMoreLikes = async (picid) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE pp_pics SET likes = (likes + 1) WHERE pic_id = ?;', picid);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const deleteLike= async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM pp_likes WHERE pic_id = ? AND username = ?;',
        params);
    return rows;
  }
  catch (e) {
    console.log('error', e.message);
  }
};

const deleteAllLikes= async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM pp_likes WHERE pic_id = ?;',
        id);
    return rows;
  }
  catch (e) {
    console.log('error', e.message);
  }
};

const updateLessLikes = async (picid) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE pp_pics SET likes = (likes - 1) WHERE pic_id = ?;', picid);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  addLikes,
  updateMoreLikes,
  deleteLike,
  updateLessLikes,
  getUserLikes,
  deleteAllLikes,
};
