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
const passwordInput = document.querySelector("#password");
const logOutBut = document.querySelector(".logout_but");
const userName = document.querySelector(".user_name");
const closeBut = document.querySelector("#close_button");
const errorMessage = document.querySelector(".error");
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
    }
  });
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();
