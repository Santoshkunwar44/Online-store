const CartController = require("../app/http/controller/Customer/CartController");
const HomeController = require("../app/http/controller/HomeController");
const AuthController = require("../app/http/controller/AuthController/AuthController");
const guest = require("../app/http/middleware/guest");
const routerInit = (app) => {
  app.get("/", HomeController().home);

  app.get("/cart", CartController().cart);
  app.get("/register", guest,AuthController().register);
  app.post("/register",AuthController().postRegister);
  app.get("/login", guest, AuthController().login);
  app.post("/login", AuthController().loginPost);
  app.post("/logout", AuthController().logout);
  app.post("/update-cart", CartController().update);
};

module.exports = routerInit;
