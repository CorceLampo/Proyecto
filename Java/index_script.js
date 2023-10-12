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
});
