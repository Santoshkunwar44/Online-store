const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../../../model/user");
const LoginController = () => {
  const getRedirectUrl=(req)=>{
    return req.user.role==="admin" ? "/admin/orders" : "/customer/orders"
  }
  return {
    login: (req, res) => res.render("auth/login"),

    loginPost: (req, res, next) => {
      const { email, password } = req.body;
      if (!email || !password) {
        req.flash("error ", "Missing Credentials..");
      }

      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return res.err;
          }
          return res.redirect(getRedirectUrl(req));
        });
      })(req, res, next);
    },

    register: (req, res) => res.render("auth/register"),
    postRegister: async (req, res) => {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        req.flash("error", "All fields required");
        req.flash("name", username);
        req.flash("email", email);
        return res.redirect("/register");
      }

      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email already exits");
          req.flash("name", username);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });
      //hashing the password

      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const user = new User({
          name: username,
          email,
          password: hashedPass,
        });
        // saving the user in the Db
        const savedUser = await user.save();
        console.log(savedUser);
        return res.redirect("/");
      } catch (err) {
        console.log(err);
      }
    },
    logout: (req, res) => {
      req.logout();
      return res.redirect("/login");
    },
  };
};

module.exports = LoginController;
