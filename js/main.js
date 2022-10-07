new WOW().init();

// const basket_button = document.querySelector("#basket_button");
// const close_button = document.querySelector("#close_button");
// const modal = document.querySelector(".modal");

// basket_button.addEventListener("click", toggle_modal);
// close_button.addEventListener("click", toggle_modal);

// function toggle_modal() {
//   modal.classList.toggle("is_open");
// }

const modalAuth = document.querySelector(".modal_auth");
const loginBut = document.querySelector(".login_but");
const loginForm = document.querySelector("#login_form");
const logInInput = document.querySelector("#user_name");
const logOutBut = document.querySelector(".logout_but");
const userName = document.querySelector(".user_name");
const closeBut = document.querySelector("#close_button");
const errorMessage = document.querySelector(".error");
let login = localStorage.getItem("login");

function toggleModalAuth() {
  modalAuth.classList.toggle("is_open");
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
}

function notAuthorized() {
  console.log("Not Authorized");
  function logIn(event) {
    event.preventDefault();
    if (logInInput.value) {
      errorMessage.textContent = "*";
      login = logInInput.value;
      localStorage.setItem("login", login);
      modalAuth.classList.remove("is_open");
      loginBut.removeEventListener("click", toggleModalAuth);
      closeBut.removeEventListener("click", toggleModalAuth);
      loginForm.removeEventListener("submit", logIn);
      loginForm.reset();
      checkAuth();
    } else {
      errorMessage.textContent = "Введите логин";
    }
  }
  loginBut.addEventListener("click", toggleModalAuth);
  closeBut.addEventListener("click", toggleModalAuth);
  loginForm.addEventListener("submit", logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();
