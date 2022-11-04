'use strict'
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";

const modalAuth = document.querySelector(".modal_auth");
const loginBut = document.querySelector(".login_but");
const loginForm = document.querySelector("#login_form");
const logInInput = document.querySelector("#user_name");
const passwordInput = document.querySelector("#password");
const logOutBut = document.querySelector(".logout_but");
const userName = document.querySelector(".user_name");
const closeBut = document.querySelector("#close_button");
const errorMessage = document.querySelector(".error");
const rCards = document.querySelector(".r_cards");
const foodSection = document.querySelector(".food");
const swiper = document.querySelector(".swiper");
const logo = document.querySelector(".logo_pic");
const foodCards = document.querySelector(".food_cards");
let login = localStorage.getItem("login");

function toggleModalAuth() {
  modalAuth.classList.toggle("is_open");
  if (modalAuth.classList.contains("is_open")) {
    document.body.style.cssText = `
      position: relative;
      overflow: hidden;
      height:100vh;
      `;
  } else {
    document.body.style.cssText = ``;
  }
}

function authorized() {
  console.log("Authorized");

  function logOut() {
    login = null;
    localStorage.removeItem("login");
    loginBut.style.display = "";
    logOutBut.style.display = "";
    userName.style.display = "";
    logOutBut.removeEventListener("click", logOut);
    checkAuth();
  }
  loginBut.style.display = "none";
  logOutBut.style.display = "flex";
  userName.style.display = "block";
  userName.textContent = login;
  logOutBut.addEventListener("click", logOut);
  rCards.removeEventListener("click",toggleModalAuth);
  rCards.addEventListener("click", OpenProducts);
}

function notAuthorized() {
  console.log("Not Authorized");

  function logIn(event) {
    event.preventDefault();
    if (logInInput.value && passwordInput.value) {
      errorMessage.textContent = "*";
      logInInput.classList.remove("red_border");
      passwordInput.classList.remove("red_border");
      login = logInInput.value;
      localStorage.setItem("login", login);
      modalAuth.classList.remove("is_open");
      document.body.style.cssText = ``;
      loginBut.removeEventListener("click", toggleModalAuth);
      closeBut.removeEventListener("click", toggleModalAuth);
      loginForm.removeEventListener("submit", logIn);
      loginForm.reset();
      checkAuth();
    } else if (logInInput.value === "") {
      passwordInput.classList.remove("red_border");
      errorMessage.textContent = "Введите логин";
      logInInput.classList.add("red_border");
    } else if (passwordInput.value === "") {
      logInInput.classList.remove("red_border");
      errorMessage.textContent = "Введите пароль";
      passwordInput.classList.add("red_border");
    }
  }
  loginBut.addEventListener("click", toggleModalAuth);
  closeBut.addEventListener("click", toggleModalAuth);
  loginForm.addEventListener("submit", logIn);
  modalAuth.addEventListener("click", (event) => {
    if (event.target.classList.contains("is_open")) {
      toggleModalAuth();
    };
  });

  rCards.removeEventListener("click", OpenProducts);
  rCards.addEventListener("click", toggleModalAuth);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function CreateRestaurantCard() {
  const card = `
   <div class="r_card">
            <img src="./img/card-img-1.png" alt="pizza" />
            <div class="card_caption">
              <div class="child_cap top_cap">
                <p class="card_name">Пицца плюс</p>
                <p class="card_time">50 мин</p>
              </div>
              <div class="child_cap bottom_cap">
                <p class="card_rating">4.5</p>
                <p class="pr_cat card_price">От 900 ₴</p>
                <p class="pr_cat card_category">Пицца</p>
              </div>
            </div>
          </div>
  `;
  rCards.insertAdjacentHTML("afterbegin", card);
}

function CreateProductCard() {
  const card = `
   <div class="food_card wow fadeInUp" data-wow-delay="0.2s">
            <img
              src="./img/food_card-pic-1.png"
              alt="food"
              class="food_card_img"
            />
            <div class="food_card_caption">
              <p class="food_card_name">Ролл угорь стандарт</p>
              <p class="food_card_text">
                Рис, угорь, соус унаги, кунжут, водоросли нори.
              </p>
              <button class="food_card_button">В корзину</button>
              <span class="food_card_price">250 ₴</span>
            </div>
    </div>
  `;
  foodCards.insertAdjacentHTML("afterbegin", card);
}

function OpenProducts(event) {
  const restaurant = event.target.closest(".r_card");
  if (restaurant) {
    swiper.classList.add("hide");
    rCards.classList.add("hide");
    foodSection.classList.remove("hide");
    foodCards.textContent='';
    logo.addEventListener("click", () => {
      swiper.classList.remove("hide");
      rCards.classList.remove("hide");
      foodSection.classList.add("hide");
    });
    CreateProductCard();
    CreateProductCard();
    CreateProductCard();
  }
}

new Swiper(".swiper", {
  sliderPerView: 1,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
});

new WOW().init();
checkAuth();
CreateRestaurantCard();
CreateRestaurantCard();
CreateRestaurantCard();
