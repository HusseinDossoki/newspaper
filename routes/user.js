const router    = require('express').Router();
const bcrypt    = require('bcryptjs');
const passport  = require('passport');
let User        = require('../models/User');


router.get('/register', (req, res) => {
  res.render('register');
});


// add user to database
router.post('/register', (req, res) => {
  
  let newUser = new User();
  newUser.displayName   = req.body.displayName;
  newUser.email         = req.body.email;
  newUser.password      = req.body.password;

  bcrypt.genSalt(10, (err, salt) => {
    if(err) throw err;
    bcrypt.hash(newUser.password, salt, (err, hashed) => {
      if(err) throw err;
      newUser.password = hashed;
      newUser.save((err) => {
        if(err) throw err;
        res.redirect('/user/login');
      });
    })
  });


});


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/user/login',
}), (req, res) => {
  res.redirect('/');
});


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});



module.exports = router;