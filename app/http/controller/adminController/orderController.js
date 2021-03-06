const Order = require("../../../model/Order");

const orderController = () => {
  return {
    index: async (req, res) => {
      Order.find(
        {
          status: { $ne: "completed" },
        },
        null,
        { sort: { createdAt: -1 } }
      )
        .populate("customerId", "-password")
        .exec((err, orders) => {
          if (req.xhr) {
            console.log(orders);
            return res.json(orders);
          } else {
            return res.render("admin/orders");
          }
        });
    },  

   
  };
};
module.exports = orderController;
