const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// for register page
const registerView = (req, res) => {
  res.render("register", {});
};

const registerUser = (req, res) => {
  const { name, email, location, password, confirm } = req.body;
  if(!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }

  // confirm password
  if(password !== confirm) {
    console.log("password harus sama dengan confirm");
  } else {
    // validation
    User.findOne({ email: email }).then((user) => {
      if(user) {
        console.log("Email sudah ada");
        res.render("register", {
          name,
          email,
          password,
          confirm,
        });
      } else {
        // validation
        const newUser = new User({
          name,
          email,
          location,
          password,
        });

        // password hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(res.redirect('/login'))
            .catch((err) => console.log(err));
          });
        });
      }
    });
  }
};

// for view
const loginView = (req, res) => {
  res.render("login", {});
}

const loginUser = (req, res) => {
  const { email, password } = req.body;

  // required
  if(!email || !password) {
    console.log("email and password is required");
    res.render("login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
  }
};

module.exports = { registerView, registerUser, loginView, loginUser };