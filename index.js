const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

// mongodb connection  useUnifiedToplogy: true,
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, { useNewUrlParser: true })
.then(() => console.log('Koneksi berhasil'))
.catch(err => console.error(err));

app.use(session({
  secret: 'oneboy',
  saveUninitialized: true,
  resave: true,
}));

app.set('view engine', 'ejs');

// body parsing
app.use(express.urlencoded( {extended: false} ));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', require('./routes/login'));

const port = process.env.PORT || 4111;
app.listen(port, console.log(`Server berjalan pada port : ${port}`));