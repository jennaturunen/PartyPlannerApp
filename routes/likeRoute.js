'use strict';
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

//Get the likes
router.get('/user/:user', likeController.like_user_likes);

// Add likes
router.post('/:addlike', likeController.like_add_likes);

// Update likes
router.put('/:upd', likeController.like_update_likes);

// Delete likes
router.delete('/:deletelike', likeController.like_delete_like);
router.delete('/deleteall/:id', likeController.like_delete_all_likes);


module.exports = router;