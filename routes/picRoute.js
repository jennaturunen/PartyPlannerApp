'use strict';
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const multer = require('multer');   // Needed for the upload
const upload = multer({dest: 'uploads/'});
const picController = require('../controllers/picController');

// Get photo(s)
router.get('/', picController.pic_list_get);
router.get('/:id', picController.pic_get);
router.get('/user/:username', picController.pic_get_users_pics);


// Search by tag or theme name
router.get('/tag/:tagi', picController.pic_search_by_tag);
router.get('/theme/:theme', picController.pic_search_by_theme);


// Upload post/pic and file
router.post('/', upload.single('filename'), (req, res, next) => {
  console.log('pic post file', req.file);

  if (req.file === undefined) {
    res.json({
      error: 'No file',
    });
  } else if (!req.file.mimetype.includes('image')){
    res.json({
      error: 'Not an image',
    });
  } else {
    //filename to body
    req.body.filename = req.file.filename;
    next();
  }

});

// Add picture
router.post('/', picController.pic_create_post);

// Update picture
router.put('/',
    [
      body('description', 'cannot be empty').isLength({min: 1}),
      body('tags', 'cannot be empty').isLength({min: 1}),  // lisää vielä maksimi
      body('id', 'must be number').isNumeric().isLength({min: 1}),
    ],
    picController.pic_update_put
);


//Delete picture
router.delete('/:id', picController.pic_delete);


module.exports = router;