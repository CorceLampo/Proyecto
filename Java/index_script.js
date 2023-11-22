window.onload = function () {
  $("#onload").fadeOut();
  $("body").removeClass("hidden");
};

document.addEventListener("DOMContentLoaded", function () {
  let hideInfoBtns = document.querySelectorAll(".services-cards__card");
  let hideInfoElements = document.querySelectorAll(".services-cards__card--info");

  hideInfoBtns.forEach((button, index) => {
    button.addEventListener("click", function () {
      hideInfoElements[index].classList.toggle("show");
    });
  });

  const user = JSON.parse(localStorage.getItem("login_sucess")) || false;

  const logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    alert("Sesión cerrada correctamente"),
      localStorage.removeItem("login_sucess");
    this.location.reload();
  });

  const login = document.getElementById("user-name");
  let user_container = document.getElementById("menu-user");
  let account = document.getElementById("nav-menu__items--account")
  const addToCartButton = document.querySelectorAll(".services-cards__card--addButton")

  if (user) {
    logout.style.display = "block";
    login.style.display = "none";
    user_container.style.cursor = "default";
    user_container.innerHTML += `
    <div id="user_container">
    ${user.name}
    <div>
    `
    account.style.backgroundColor = "#cccccc"
    account.style.padding = "10px 2rem 10px 2rem"
    account.style.borderRadius = "10px"
    account.style.gap = "10px"
    account.style.boxShadow = "0px 5px 32px -12px rgba(140,140,140,1)"

  } else {  
    logout.style.display = "none";
    addToCartButton.forEach(button => {
    button.style.display = "none";
    })
  }

  let products = [
    {
      name: "Un Mundo Feliz",
      tag: "Libro 9",
      price: "32950",
      inCart: "0",
    },
    {
      name: "Animal Farm",
      tag: "Libro 7",
      price: "21900",
      inCart: "0",
    },

    {
      name: "Alegro ma non troppo",
      tag: "Libro 6",
      price: "28900",
      inCart: "0",
    },
    {
      name: "Adam Smith",
      tag: "Libro 4",
      price: "149900",
      inCart: "0",
    },
    {
      name: "La Regenta",
      tag: "Libro 3",
      price: "28900",
      inCart: "0",
    },
    {
      name: "Tragedias",
      tag: "Libro2",
      price: "28900",
      inCart: "0",
    },
    {
      name: "Meditaciones",
      tag: "Libro1",
      price: "28900",
      inCart: "0",
    },
    {
      name: "Fahrenheit 451",
      tag: "Libro 8",
      price: "28900",
      inCart: "0",
    },
    {
      name: "Santa Biblia",
      tag: "Libro 10",
      price: "35900",
      inCart: "0",
    },
    {
      name: "El Corán",
      tag: "Libro 11",
      price: "35900",
      inCart: "0",
    },
    {
      name: "Historia Mínima de Colombia",
      tag: "Libro 12",
      price: "39900",
      inCart: "0",
    },
    {
      name: "El Hombre en busca de Sentido",
      tag: "Libro 13",
      price: "39900",
      inCart: "0",
    },
  ];

  let carts = document.querySelectorAll(".services-cards__card--addButton");
  for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
      displayCart();
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
      product.price = parseInt(product.price);
      product.inCart = parseInt(product.inCart);
      localStorage.setItem("totalCost", cartCost + product.price);
    } else {
      localStorage.setItem("totalCost", product.price);
    }
  }

  displayCart();
});

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".shoping-cart__products");
  let cartCost = localStorage.getItem("totalCost");
  let productsContainer = document.querySelector(".shoping-cart");
  let productNumbers = JSON.parse(localStorage.getItem("cartNumbers"));

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="table-books">
        <div class="shoping-cart__indicators--product">
          <img class="shoping-cart__indicators--close" onclick="removeBook('${
            item.tag
          }')" src="/assets/Box_Items/close.svg">
          <img class="libro" src="/assets/Images/${item.tag}.jpg">
        </div>
        <div class="shoping-cart__indicators--price">
        <p class="shoping-cart__title">Precio:  </p>
        COP$${item.price},00
        </div>
        <p class="shoping-cart__title">Cantidad</p>
        <div class="shoping-cart__indicators--quantity">
          <img class="shoping-cart__indicators--arrows" onclick="disminuirCantidad('${
            item.tag
          }')" src="/assets/Box_Items/left.svg">
          <span>${item.inCart}</span>
          <img class="shoping-cart__indicators--arrows" onclick="aumentarCantidad('${
            item.tag
          }')" src="/assets/Box_Items/right.svg">
        </div>
        <div class="shoping-cart__indicators--total">
        <p class="shoping-cart__title">Precio total:   </p>
        COP$${item.inCart * item.price},00
        </div>
      </div>
      `;
    });
    productContainer.innerHTML += `
    <div class="shoping-cart__totalPriceContainer">
      <h4 class="shoping-cart__totalPriceContainer--title"> 
      Canasta total:
      </h4>
      <h4 class="shoping-cart__totalPriceContainer--totalPrice">
      $${cartCost},00
      </h4>
      <div class="shoping-cart_buyButton" onclick="soon()">
      <img src="/assets/Box_Items/cart.svg">Comprar
      </div>
      </div>
     `;
  }
  if (productNumbers >= 1) {
    productsContainer.style.display = "block";
  } else {
    productsContainer.style.display = "none";
  }
}

function disminuirCantidad(product) {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || {};
  let productNumbers = JSON.parse(localStorage.getItem("cartNumbers"));
  let cartCost = parseInt(localStorage.getItem("totalCost"));

  if (cartItems[product] && cartItems[product].inCart > 1) {
    cartItems[product].inCart--;
    cartItems[product].price = parseInt(cartItems[product].price);
    cartCost = cartCost - cartItems[product].price;
    localStorage.setItem("cartNumbers", productNumbers - 1);
    localStorage.setItem("totalCost", cartCost);
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    displayCart();
  }
}

function aumentarCantidad(product) {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || {};
  let productNumbers = JSON.parse(localStorage.getItem("cartNumbers"));
  let cartCost = parseInt(localStorage.getItem("totalCost"));

  if (cartItems[product]) {
    cartItems[product].inCart++;
    cartItems[product].price = parseInt(cartItems[product].price);
    cartCost = cartCost + cartItems[product].price;
    localStorage.setItem("cartNumbers", productNumbers + 1);
    localStorage.setItem("totalCost", cartCost);
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    displayCart();
  }
}

function removeBook(tag) {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || {};
  let productNumbers = JSON.parse(localStorage.getItem("cartNumbers"));
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems[tag] && cartItems[tag].inCart > 0) {
    cartItems[tag].inCart--;

    localStorage.setItem("cartNumbers", productNumbers - 1);
    cartCost = cartCost - cartItems[tag].price;
    localStorage.setItem("totalCost", JSON.stringify(cartCost));

    if (cartItems[tag].inCart === 0) {
      delete cartItems[tag];
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    displayCart();
  }
}

function soon() {
  alert("¡Próximamente!");
}
