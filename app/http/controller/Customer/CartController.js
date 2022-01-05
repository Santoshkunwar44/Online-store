const CartController = () => {
  return {
    cart: (req, res) => res.render("customer/cart"),
    update: (req, res) => {
      // let cart={
      //     items:{
      //         product._id:{item:productObj,qty:0},
      // qty:0
      //     },
      //     totalQty:0,
      //     totalPrice:0,
      // }

      // for the first time creating cart and adding basic object structure
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }

      let cart = req.session.cart;

      //   if the item doesnot exist in the cart
      if (!cart.items[req.body._id]) {
        (cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        }),
          (cart.totalQty = cart.totalQty + 1),
          (cart.totalPrice = cart.totalPrice + req.body.price);
      } else {
        // else if the item already exist in the users session's / cart
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }
      return res.json({ totalQty: req.session.cart.totalQty });
    },
  };
};
module.exports = CartController;

//     req.session.cart = {
//       items: {},
//       totalQty: 0,
//       totalPrice: 0,
//     };

// cart = {
//   items: {
//       id:{},
//       id:{},
//       id:{},
//   },
//   totalQty: 9,
//   totalPrice: 17771,
// };
