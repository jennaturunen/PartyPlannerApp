'use strict';
const express = require('express');
const passport = require('./utils/pass');
const app = express();
const port = 8000;
const cors = require('cors');
const picRoute = require('./routes/picRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const likeRoute = require('./routes/likeRoute');

app.use(cors());
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));   //share thumbnails folder

app.use('/pic',passport.authenticate('jwt', {session: false}),  picRoute);
app.use('/like', passport.authenticate('jwt', {session: false}), likeRoute);
app.use('/user',passport.authenticate('jwt', {session: false}),  userRoute);  // < Token is needed to login
app.use('/auth', authRoute);    // Login is unprotected

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
