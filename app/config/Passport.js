const User = require("../model/user");
const bcrypt=require("bcrypt")
const LocalStrategy = require("passport-local").Strategy;

function init(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        //login
        //check the email exists
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, {
            message: "User with this email donnot exist",
          });
        }

        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: "Logged In Successfully" });
            }
            return done(null, false, {
              message: "Invalid username or password",
            });
          })
          .catch((err) => {
            return done(null, false, { message: "Something went wrong " });
          });
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = init;
