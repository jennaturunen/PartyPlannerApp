'use strict';
const likeModel = require('../models/likeModel');

const like_user_likes = async (req, res) => {
  const username = [req.params.user];
  const result = await likeModel.getUserLikes(username);
  await res.json(result);
};

const like_add_likes = async (req, res) => {
  const values = req.params.addlike;
  const splitted = values.split(',');
  const username = splitted[0];
  const pic_id = splitted[1];

  const params = [
    pic_id,
    username,
  ];

  const result = await likeModel.addLikes(params);
  await res.json(result);

};

const like_update_likes = async (req, res) => {
  const values = req.params.upd;
  const splitted = values.split(',');
  const pic_id = splitted[0];
  const luokka = splitted[1];

  const id = [pic_id];

  if (luokka === 'like') {
    const result = await likeModel.updateMoreLikes(id);
    await res.json(result);
  } else if (luokka === 'unlike') {
    const result = await likeModel.updateLessLikes(id);
    await res.json(result);
  } else {
    return false;
  }

};

const like_delete_like = async (req, res) => {
  const values = req.params.deletelike;
  const splitted = values.split(',');
  const username = splitted[0];
  const pic_id = splitted[1];

  const params = [
    pic_id,
    username,
  ];

  const result = await likeModel.deleteLike(params);
  await res.json(result);
};


const like_delete_all_likes = async (req, res) => {
  const pic_id = [req.params.id];
  const result = await likeModel.deleteAllLikes(pic_id);
  await res.json(result);
};


module.exports = {
  like_add_likes,
  like_update_likes,
  like_delete_like,
  like_user_likes,
  like_delete_all_likes,
};