// import fetch from "node-fetch";
// import { loggedIn } from "./utils.js";
import { handleErrors } from "./utils.js";
// import { api } from "../../config";

const logInScreen = document.querySelector('.loggedIn');
const logOutScreen = document.querySelector('.loggedOut');
const signInButton = document.querySelectorAll('.signInBanner');
const signUpButton = document.querySelectorAll('.signUpBanner');
const signInDisplay = document.querySelector('.signInFormDiv');
const signUpDisplay = document.querySelector('.signUpFormDiv');
const swapToLogIn = document.querySelector('.swapToLogIn');
const swapToSignUp = document.querySelector('.swapToSignUp');
const errorsContainer = document.querySelectorAll(".errors-container");
const demoLoginDiv = document.querySelector('.demoLogIn');
const closeForm = document.querySelectorAll('.closeForm')
const logInForm = document.querySelector(".logInForm")
const signUpForm = document.querySelector(".signUpForm");
const demoLogin = document.querySelectorAll('.demo');

function loggedIn() {
  debugger
    console.log("cookies", document.cookies)
    const cookies = getCookies(document.cookie)
    console.log("cookies", cookies)
    return cookies.userId
    // const userId = localStorage.getItem("MEDIUM_CURRENT_USER_ID");
    // if(userId) return userId;
    // return false;
  }



window.addEventListener("DOMContentLoaded", async e => {
  console.log("yo")
  debugger
  console.log("cookies", document.cookies)
  let logged = loggedIn();
  if (logged) {
    logInScreen.classList.remove('hidden');
  } else {
    demoLoginDiv.classList.remove('hidden');
    logOutScreen.classList.remove('hidden');
  }
})
