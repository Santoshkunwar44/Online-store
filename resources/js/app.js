const axios = require("axios");
const Noty = require("noty");
const moment = require("moment");
const adminInit = require("./admin");
// querySelectorAll gets all the elem in an array
let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.getElementById("cart-counter");

const alertElm = document.querySelector("#success-alert");

console.log("alert");
if (alertElm) {
  setTimeout(() => {
    console.log("removed");
    alertElm.remove();
  }, 2000);
}

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

adminInit();

//update the order status
let statuses = document.querySelectorAll(".status_line");
let orderElem = document.querySelector("#hiddenInput");
let order = orderElem ? orderElem.value : null;
let time = document.createElement("h2");
let parsedOrder = JSON.parse(order);
console.log(parsedOrder);

function updateStatus(order) {
  let stepCompleted = true;
  statuses.forEach((stat) => {
    let dataStatus = stat.dataset.status;
    if (stepCompleted) {
      stat.classList.add("step-completed");
    }

    if (dataStatus === parsedOrder.status) {
      stepCompleted = false;
      time.innerText = "hello";
      stat.appendChild(time);

      if (stat.nextElementSibling) {
        stat.nextElementSibling.classList.add("current-step");
      }
    }
  });
}

updateStatus(order);
