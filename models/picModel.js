'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPics = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM pp_pics');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};


const getPic = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM pp_pics WHERE pic_id = ?', id);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getUsersPics = async (username) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM pp_pics Where username = ?', username);
    return rows;
  }
  catch (e) {
    console.log('error haussa', e.message);
  }
};

const getSearchedThemePics = async (params) => {
  params = '%' + params + '%';

  try {
    const [rows] = await promisePool.query('SELECT * FROM pp_pics WHERE theme LIKE ?', params);
    return rows;
  } catch (e) {
    console.log('error in theme search', e.message);
  }
};

const getSearchedTagPics = async (params) => {
  params = '%' + params + '%';

  try {
    const [rows] = await promisePool.query('SELECT * FROM pp_pics WHERE tags LIKE ?', params);
    return rows;
  } catch (e) {
    console.log('error in tag search', e.message);
  }
};

const addPic = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO pp_pics (username, description, tags, filename, theme) VALUES (?, ?, ?, ?, ?);', params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};


const updatePic = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE pp_pics SET description = ?, tags = ? WHERE pic_id = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e);
  }
};


const deletePic = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM pp_pics WHERE pic_id = ?;',
        id);
    return rows;
  }
  catch (e) {
    console.log('error', e.message);
  }
};



module.exports = {
  getUsersPics,
  getSearchedTagPics,
  getSearchedThemePics,
  getAllPics,
  getPic,
  addPic,
  updatePic,
  deletePic,
};
