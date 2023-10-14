window.onload = function () {
  $("#onload").fadeOut();
  $("body").removeClass("hidden");
};

document.addEventListener("DOMContentLoaded", function () {
  let hideInfoBtns = document.querySelectorAll(".card");
  let hideInfoElements = document.querySelectorAll(".card_info");

  hideInfoBtns.forEach((button, index) => {
    button.addEventListener("click", function () {
      hideInfoElements[index].classList.toggle("show");
    });
  });

  const user = JSON.parse(localStorage.getItem("login_sucess")) || false;
  const user_name = document.getElementById("user_name");

  const logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    alert("Sesión cerrada correctamente"),
      localStorage.removeItem("login_sucess");
    this.location.reload();
  });

  function prevenirRedireccion(event) {
    event.preventDefault();
  }

  if (user) {
    document.getElementById("user_name").innerText = user.name;
    logout.style.display = "block";
    user_name.style.cursor = "default";
    user_name.addEventListener("click", prevenirRedireccion);
  } else {
    logout.style.display = "none";
  }

  let products = [
    {
      name: "Alegro ma non troppo",
      tag: "Book-1",
      price: "30000",
      inCart: "0",
    },
    {
      name: "Adam Smith",
      tag: "Book-2",
      price: "110000",
      inCart: "0",
    },
    {
      name: "La Regenta",
      tag: "Book-3",
      price: "20000",
      inCart: "0",
    },
    {
      name: "Tragedias",
      tag: "Book-4",
      price: "30000",
      inCart: "0",
    },
    {
      name: "Meditaciones",
      tag: "Book-5",
      price: "30000",
      inCart: "0",
    },
    {
      name: "Fahrenheit 451",
      tag: "Book-6",
      price: "30000",
      inCart: "0",
    },
    {
      name: "Santa Biblia",
      tag: "Book-7",
      price: "20000",
      inCart: "0",
    },
    {
      name: "El Corán",
      tag: "Book-8",
      price: "30000",
      inCart: "0",
    },
    {
      name: "Historia Mínima de Colombia",
      tag: "Book-9",
      price: "30000",
      inCart: "0",
    },
    {
      name: "El Hombre en busca de Sentido",
      tag: "Book-10",
      price: "30000",
      inCart: "0",
    },
  ];

  let carts = document.querySelectorAll(".add_cart");
  for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
    });
  }

  function cartNumbers(product) {
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
      localStorage.setItem("cartNumbers", productNumbers + 1);
    } else {
      localStorage.setItem("cartNumbers", 1);
    }
    setItems(product);
  }

  function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
      if (cartItems[product.tag] == undefined) {
        cartItems = {
          ...cartItems,
          [product.tag]: product,
        };
      }
      product.inCart = 0;
      cartItems[product.tag].inCart += 1;

    } else {
      product.inCart = 1;
      
      cartItems = {
        [product.tag]: product,
      };
    }

    console.log("My cart items are", cartItems);
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  }

  function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");
    if (cartCost != null) {
      cartCost = parseInt(cartCost);
      product.price = parseInt(product.price)
      localStorage.setItem("totalCost", cartCost + product.price);
    } else {
      localStorage.setItem("totalCost", product.price);
    }
  }
});
