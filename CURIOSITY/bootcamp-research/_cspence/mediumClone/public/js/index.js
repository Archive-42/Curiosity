// import fetch from "node-fetch";
import { loggedIn } from "./utils.js";
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

window.addEventListener("DOMContentLoaded", async e => {
  let logged = loggedIn();
  if (logged) {
    logInScreen.classList.remove('hidden');
  } else {
    demoLoginDiv.classList.remove('hidden');
    logOutScreen.classList.remove('hidden');
  }
})

signInButton.forEach(e => {
  e.addEventListener('click', e => {
    e.preventDefault();
    signInDisplay.classList.remove('hidden');
    errorsContainer.forEach(e => {
      e.innerHTML = '';
    })
  })
})
// signInButton.addEventListener('click', e => {
//   e.preventDefault();
//   signInDisplay.classList.remove('hidden');
//   errorsContainer.forEach(e => {
//     e.innerHTML = '';
//   })
// })
signUpButton.forEach(e => {
  e.addEventListener('click', e => {
    e.preventDefault();
    signUpDisplay.classList.remove('hidden');
    errorsContainer.forEach(e => {
      e.innerHTML = '';
    })
  })
})

demoLogin.forEach(elem => {
  elem.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log("\ntrying token get...")
    const email = 'demo@user.com'
    const password = '1234567890'
    const body = { email, password }
    try {
      console.log("\ntrying token get...")
      // ADD THIS ONCE VALIDATION IS IMPLEMENTED
      const res = await fetch(`/api/users/token`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("\nres ok?", res.ok)
      if (!res.ok) {
        throw res;
      }
      const {
        token,
        user: {id},
      } = await res.json();

      // storage access_token in localStorage:
      // document.cookie = `MEDAYUM_TOKEN=${token}`
      // document.cookie = `MEDAYUM_USER_ID=${id}`
      localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
      localStorage.setItem("MEDIUM_CURRENT_USER_ID", id);
      // redirect to home page
      window.location.href = "/";
    } catch (err) {
      handleErrors(err);
    }
  })
})
logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(logInForm);
  const email = formData.get("email");
  email.toLowerCase();
  const password = formData.get("password");
  const body = { email, password };

  try {
    // ADD THIS ONCE VALIDATION IS IMPLEMENTED
    const res = await fetch(`/api/users/token`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw res;
    }
    const {
      token,
      user: { id },
    } = await res.json();
    // storage access_token in localStorage:
    // document.cookie = `MEDAYUM_TOKEN=${token}`
    // document.cookie = `MEDAYUM_USER_ID=${id}`
    localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
    localStorage.setItem("MEDIUM_CURRENT_USER_ID", id);
    // redirect to home page:
    window.location.href = "/";
  } catch (err) {
    handleErrors(err);
  }
})
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm);
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get('confirmPassword')
  const body = { firstName, lastName, email, password, confirmPassword };
  try {
    //  ADD THIS ONCE AUTHORIZATION IS IMPLEMENTED
    const res = await fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res is", res)
    if (!res.ok) {
      console.log("okay is...", res.ok, res.status)
      throw res;
    } else {
      const jsonRes = await res.json();
      console.log("jsonRes is ", jsonRes)
      const { token, newUser: { id } } = jsonRes
      // storage access_token in localStorage:
      document.cookie = `MEDAYUM_TOKEN=${token}`
      document.cookie = `MEDAYUM_USER_ID=${id}`
      localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
      localStorage.setItem("MEDIUM_CURRENT_USER_ID", id);
      // redirect to home page
      window.location.href = "/";
    }
  } catch (err) {
    console.log("caught the error", err.ok, err)
    handleErrors(err);
  }
});
swapToLogIn.addEventListener('click', e => {
  e.preventDefault();
  signUpDisplay.classList.add('hidden');
  signInDisplay.classList.remove('hidden');
  errorsContainer.forEach(e => {
    e.innerHTML = '';
  })
})
swapToSignUp.addEventListener('click', e => {
  signInDisplay.classList.add('hidden');
  signUpDisplay.classList.remove('hidden');
  errorsContainer.forEach(e => {
    e.innerHTML = '';
  })
})
closeForm.forEach(e => {
  e.addEventListener('click', e => {
    e.preventDefault();
    signInDisplay.classList.add('hidden');
    signUpDisplay.classList.add('hidden');
  })
})

//Slideshow handlers
const slide1 = document.querySelector(".slide1");
const slide2 = document.querySelector(".slide2");
const slide3 = document.querySelector(".slide3");
const slide4 = document.querySelector(".slide4");
const slide5 = document.querySelector(".slide5");
const slideButton1 = document.querySelector(".slideShowNavigationButton1");
const slideButton2 = document.querySelector(".slideShowNavigationButton2");
const slideButton3 = document.querySelector(".slideShowNavigationButton3");
const slideButton4 = document.querySelector(".slideShowNavigationButton4");
const slideButton5 = document.querySelector(".slideShowNavigationButton5");
const wipeCss = () => {
  slide1.classList.add('hidden')
  slide2.classList.add('hidden')
  slide3.classList.add('hidden')
  slide4.classList.add('hidden')
  slide5.classList.add('hidden')
  slideButton1.classList.remove('currentSlideButton')
  slideButton2.classList.remove('currentSlideButton')
  slideButton3.classList.remove('currentSlideButton')
  slideButton4.classList.remove('currentSlideButton')
  slideButton5.classList.remove('currentSlideButton')
}

let count = 1;
const displaySlideEventListener = (slide, slideButton, counter) => {
  slideButton.addEventListener('click', e => {
    wipeCss();
    slide.classList.remove('hidden')
    slideButton.classList.add('currentSlideButton')
    count = counter;
  })
}
displaySlideEventListener(slide1, slideButton1, 1);
displaySlideEventListener(slide2, slideButton2, 2);
displaySlideEventListener(slide3, slideButton3, 3);
displaySlideEventListener(slide4, slideButton4, 4);
displaySlideEventListener(slide5, slideButton5, 5);

const displaySlide = (slide, slideButton) => {
  wipeCss();
  slide.classList.remove('hidden')
  slideButton.classList.add('currentSlideButton')
}
setInterval(function dynamicDisplay() {
  if (count === 1) {
    displaySlide(slide2, slideButton2);
    count++
  }
  else if (count === 2) {
    displaySlide(slide3, slideButton3);
    count++
  }
  else if (count === 3) {
    displaySlide(slide4, slideButton4);
    count++
  }
  else if (count === 4) {
    displaySlide(slide5, slideButton5);
    count++
  }
  else if (count === 5) {
    displaySlide(slide1, slideButton1);
    count = 1
  }
}, 7000)
