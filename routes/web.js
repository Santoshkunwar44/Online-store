const CartController = require("../app/http/controller/Customer/CartController");
const HomeController = require("../app/http/controller/HomeController");
const AuthController = require("../app/http/controller/AuthController/AuthController");
const routerInit = (app) => {
  app.get("/", HomeController().home);

  app.get("/cart", CartController().cart);
  app.get("/register", AuthController().register);
  app.get("/login", AuthController().login);
  app.post("/update-cart", CartController().update);
};

module.exports = routerInit;
