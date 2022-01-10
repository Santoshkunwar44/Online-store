const CartController = require("../app/http/controller/Customer/CartController");
const HomeController = require("../app/http/controller/HomeController");
const AuthController = require("../app/http/controller/AuthController/AuthController");
const OrderController = require("../app/http/controller/OrderController");
const adminOrderController = require("../app/http/controller/adminController/orderController");
const StatusController =require("../app/http/controller/StatusController")
//Middlewares
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");
const admin = require("../app/http/middleware/admin")


//routes
const routerInit = (app) => {
  app.get("/", HomeController().home);
  app.get("/cart", CartController().cart);
  app.get("/register", guest, AuthController().register);
  app.post("/register", AuthController().postRegister);
  app.get("/login", guest, AuthController().login);
  app.post("/login", AuthController().loginPost);
  app.post("/logout", AuthController().logout);
  app.post("/update-cart", CartController().update);

  //customer routes
  app.post("/order", OrderController().store);
  app.get("/customer/orders", auth, OrderController().orders);
  app.get("/customer/orders/:id",OrderController().shows);

  //admin routes
  app.get("/admin/orders",admin, adminOrderController().index);
  app.post("/admin/order/status",admin, StatusController().update);
};

module.exports = routerInit;
