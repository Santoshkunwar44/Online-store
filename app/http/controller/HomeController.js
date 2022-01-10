const Product = require("../../model/product");

const HomeController = () => {
  return {
    home: async (req, res) => {
      const fetchedProducts = await Product.find();
      res.render("home", { product: fetchedProducts });
    },
  };
};
module.exports = HomeController;
