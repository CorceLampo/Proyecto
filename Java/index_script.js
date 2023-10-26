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
    // add_cart.forEach(cartItem => {
    //  cartItem.style.display = 'block';
    // });
  } else {
    logout.style.display = "none";
    //add_cart.forEach(cartItem => {
    //  cartItem.style.display = 'none';
    //});
  }

  let products = [
    {
      name: "Alegro ma non troppo",
      tag: "Libro 6",
      price: "30000",
      inCart: "0",
    },
    {
      name: "Adam Smith",
      tag: "Libro 4",
      price: "110000",
      inCart: "0",
    },
    {
      name: "La Regenta",
      tag: "Libro 3",
      price: "20000",
      inCart: "0",
    },
    {
      name: "Tragedias",
      tag: "Libro2",
      price: "30000",
      inCart: "0",
    },
    {
      name: "Meditaciones",
      tag: "Libro1",
      price: "30000",
      inCart: "0",
    },
    {
      name: "Fahrenheit 451",
      tag: "Libro 8",
      price: "30000",
      inCart: "0",
    },
    {
      name: "Santa Biblia",
      tag: "Libro 10",
      price: "20000",
      inCart: "0",
    },
    {
      name: "El Corán",
      tag: "Libro 11",
      price: "30000",
      inCart: "0",
    },
    {
      name: "Historia Mínima de Colombia",
      tag: "Libro 12",
      price: "40000",
      inCart: "0",
    },
    {
      name: "El Hombre en busca de Sentido",
      tag: "Libro 13",
      price: "30000",
      inCart: "0",
    },
  ];

  let carts = document.querySelectorAll(".add_cart");
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
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");
  let productsContainer = document.querySelector(".products-container");
  let productNumbers = JSON.parse(localStorage.getItem("cartNumbers"));

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      
      <div class="book_container">
        <div class="product">
          <img class="close" onclick="removeBook('${
            item.tag
          }')" src="/assets/Box_Items/close.svg">
          <img class="libro" src="/assets/Images/${item.tag}.jpg">
        </div>
        <div class="price">
        <p class="indicador">Precio:  </p>
        COP$${item.price},00
        </div>
        <p class="indicador">Cantidad</p>
        <div class="quantity">
          <img id="arrow_left" class="decrease" onclick="disminuirCantidad('${
            item.tag
          }')" src="/assets/Box_Items/left.svg">
          <span>${item.inCart}</span>
          <img id="arrow_right" class="increase" onclick="aumentarCantidad('${
            item.tag
          }')" src="/assets/Box_Items/right.svg">
        </div>
        <div class="total">
        <p class="indicador">Precio total:   </p>
        COP$${item.inCart * item.price},00
        </div>
      </div>
      `;
    });
    productContainer.innerHTML += `
    <div class="basketTotalContainer">
      <h4 class="basketTotalTitle"> 
      Canasta total:
      </h4>
      <h4 class="basketTotal">
      $${cartCost},00
      </h4>
      <div id="buy" onclick="soon()">
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

    // Actualizar el número total de productos y el costo total
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
