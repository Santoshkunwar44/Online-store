const axios = require("axios");
const Noty = require("noty");
// querySelectorAll gets all the elem in an array
let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.getElementById("cart-counter");

function updateCart(product) {
  axios
    .post("/update-cart", product)
    .then((res) => {
      let cartCount = res.data.totalQty;
      cartCounter.innerText = cartCount;
      new Noty({
        type: "success",
        text: "Item added successfully",
        timeout: 1000,
        progressBar: false,
      }).show();
    })
    .catch(() =>
      new Noty({
        type: "error",
        text: "Something went wrong ",
        timeout: 1000,
        progressBar: false,
      }).show()
    );
}

addToCart.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    let product = JSON.parse(elem.dataset.product);
    updateCart(product);
  });
});
