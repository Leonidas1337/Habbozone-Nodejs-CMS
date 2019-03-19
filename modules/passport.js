const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport, db) {
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  } , function (req, username, password, done){
        if(!username || !password ) { return done(null, false, req.flash('loginError','All fields are required.')); }

        db.run.select("*", "users", "username = :user AND password = :password", {
          user: username,
          password: password
        }).then(function(row) {
          if (row[0]) {
            return done(null, {
              id: 1,
              username: "user",
              password: "pw",
              usernameField: "field user",
              passwordField: "pw field"
            });
          } else {
            return done(null, false, req.flash("loginError", 'Username oder Passwort ungültig'));
          }
        });
      }
  ));

  passport.use('local-register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    rePasswortField: 'password2',
    emailField: 'mail',
    dateField: 'birthday',
    genderField: 'gender',

    passReqToCallback: true
  } , function (req, username, password, password2, mail, birthday, gender, done){
        
        db.run.select("*", "users", "username = :user AND mail = :mail", {
          user: username,
          mail: mail
        }).then(function(row) {
          if (row[0]) {
            return done(null, {
              id: 1,
              username: "user",
              mail: "pw",
              usernameField: "field user",
              emailField: "pw field"
            });
          } else {
            return done(null, false, req.flash("loginError", 'Username oder Passwort ungültig'));
          }
        });
      }
    ));

  passport.serializeUser(function(user, done){
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
      done(null, {
          id: 1,
          username: "user",
          password: "pw",
          usernameField: "field user",
          passwordField: "pw field"
        });
  });
}
