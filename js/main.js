const basket_button = document.querySelector("#basket_button");
const close_button = document.querySelector("#close_button");
const modal = document.querySelector(".modal");

basket_button.addEventListener("click", toggle_modal);
close_button.addEventListener("click", toggle_modal);

function toggle_modal() {
  modal.classList.toggle("is_open");
}

new WOW().init();
