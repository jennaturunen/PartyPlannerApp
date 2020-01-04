'use strict';
const {validationResult} = require('express-validator');
const picModel = require('../models/picModel');
const resize = require('../utils/resize');

const pic_list_get = async (req, res) => {
  const pics = await picModel.getAllPics();
  await res.json(pics);
};

const pic_get = async (req, res) => {
  const pic = await picModel.getPic(req.params.id);
  await res.json(pic[0]);
  console.log('id'+ pic[0]);
};


const pic_search_by_theme = async (req, res) => {
  const params = [req.params.theme];
  const pics = await picModel.getSearchedThemePics(params);
  await res.json(pics);
};


const pic_search_by_tag = async (req, res) => {
  const params = [req.params.tagi];
  const pics = await picModel.getSearchedTagPics(params);
  await res.json(pics);
};

const pic_get_users_pics = async (req, res) => {
  const user = await picModel.getUsersPics([req.params.username]);
  await res.json(user);

};

const pic_create_post = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.send(errors.array());
  } else {
    try {
      // create thumbnail
      const thumb = await resize.makeThumbnail(req.file.path,
          'thumbnails/' + req.file.filename,
          {width: 500, height: 450});
      console.log('thumb', thumb);

      const params = [
        req.body.username,
        req.body.description,
        req.body.tags.toLowerCase(),
        req.body.filename, //filename is saved to body
          req.body.theme,
      ];

      const pic = await picModel.addPic(params);
      await res.json({message: 'upload ok'});
    } catch (e) {
      console.log('exif error', e);
      res.status(400).json({message: 'error'});
    }
  }
};

const pic_update_put = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.send(errors.array());
  } else {
    const params = [
      req.body.description,
      req.body.tags,
      req.body.id,
    ];

    const result = await picModel.updatePic(params);
    await res.json(result);
  }
};

const pic_delete = async (req, res) => {
  const params = [req.params.id];
  const result = await picModel.deletePic(params);
  await res.json(result);
};


module.exports = {
  pic_get_users_pics,
  pic_list_get,
  pic_get,
  pic_search_by_tag,
  pic_search_by_theme,
  pic_create_post,
  pic_update_put,
  pic_delete,
};