const LocalStrategy    = require('passport-local').Strategy;
const bcrypt           = require('bcryptjs');
let User               = require('../models/User');


module.exports = function(passport) {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // local strategy
  passport.use(new LocalStrategy({passReqToCallback : true}, (req, email, password, done) => {

    let query = {'email': email};
    User.findOne(query, (err, user) => {
      if(err) throw err;
      if(!user) {
        return done(null, false, {message: 'no user found'});
      } else {

        // if there is user then match the password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'password is wrong'});
          }

        });
      }

    });

  }));



}