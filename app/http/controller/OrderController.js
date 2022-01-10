const moment = require("moment");
const Order = require("../../model/Order");

//PLACING THE ORDERS AND STORING IT IN A DATABASE
const OrderController = (req, res) => {
  return {
    store: async (req, res) => {
      //Validate request
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "All fields are required");
        return res.redirect("/cart");
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });
      try {
        const savedOrder = await order.save();
        req.flash("success", "Order placed Successfully");
        return res.redirect("/customer/orders");
      } catch (err) {
        req.flash("error", "Something went wrong");
      }
    },

    orders: async (req, res) => {
      try {
        const orders = await Order.find({ customerId: req.user._id }, null, {
          sort: { createdAt: -1 },
        });
        const arr = [...orders];
        delete req.session.cart;

        res.render("customer/orders", { product: arr, moment: moment });
      } catch (err) {
        req.flash("error", "Error while placing order");
      }
    },



    // show the single page for the customer to track their order status
    shows: async (req, res) => {
      console.log(req.params.id)
      const order = await Order.findById(req.params.id);

      //Authorise user
      if (req.user._id.toString() === order.customerId.toString()) {
        return res.render("customer/Userorder", { order });
      }
      req.redirect("/");
    },
  };
};

//FETCHED ALL THE ORDERS FROM THE DATABASE

module.exports = OrderController;
