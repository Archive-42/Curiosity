import { loggedIn, handleErrors } from './utils.js';
const navHeader = document.querySelector('.navHeader');
const topnav = document.querySelector('.topnav');
const footer = document.querySelector('.splashFooter');
const greeting = document.querySelector('.greetingTag')
const dropdownDiv = document.querySelector('#dropdown-menu')
const dropdownButton = document.querySelector('.dropdown-toggle')

const userId = window.localStorage.getItem('MEDIUM_CURRENT_USER_ID')
// const userId = cookies('MEDIUM_USER_ID')
const logoutButton = document.querySelector('#logoutButton');

const profileButton = document.querySelector('#profileButton');
const writeStoryButton = document.querySelector('#createStoryButton')

const signInElement = document.querySelector('.signInButton');
const signUpElement = document.querySelector('.signUpButton');
const dropdownElement = document.querySelector('.dropdown');

document.addEventListener('DOMContentLoaded', async e => {
  let logged = loggedIn();
  if (logged) {
    navHeader.classList.remove('navHeaderStyles');
    // navHeader.classList.remove('cardShadow')
    let user = await fetch(`/api/users/${logged}`);
    user = await user.json();
    greeting.innerHTML = `Hello, ${user.firstName}`
} else {
  // footer.classList.remove('hidden')
  topnav.classList.remove('topNavStyles');
}

  if (logged) {
    // navHeader.classList.remove('navHeaderStyles');
    let user = await fetch(`/api/users/${logged}`);
    user = await user.json();
    greeting.innerHTML = `Hello, ${user.firstName}`
    signInElement.classList.add('hidden');
    signUpElement.classList.add('hidden');
  } else {
    footer.classList.remove('hidden')
    topnav.classList.remove('topNavStyles');
    dropdownElement.classList.add('hidden');
  }
})

// document.addEventListener('DOMContentLoaded', async (e) => {
  // const signUpInputs = document.querySelectorAll('.signUpInput');
  // signUpInputs.forEach(data => {
  //     let placeholderVal;
  //     data.addEventListener('click', (e) => {
  //         placeholderVal = e.target.getAttribute('placeholder')
  //         if (e.target.value) {
  //           e.target.value = '';
  //         } else if(placeholderVal !== '') {
  //           e.target.removeAttribute('placeholder');
  //         }
  //     })
  //   })
  // const loginEmailInput = document.querySelector('input.emailLogIn')
  // const loginPasswordInput = document.querySelector('input.passwordLogIn')
  // const logInInputs = [ loginEmailInput, loginPasswordInput ];
  // logInInputs.forEach(logInput => {
  //   logInput.addEventListener('click', (e) => {
  //     e.target.removeAttribute('placeholder');
  //   })
  // })
  // })

// })
// signUpInputs.forEach(data => {
//   let placeholderVal;
//   data.addEventListener('focus', (e) => {
//     placeholderVal = e.target.getAttribute('placeholder');
//     e.target.setAttribute('placeholder', '');
//     })
//     data.addEventListener('blur', (e) => {
//       e.target.setAttribute('placeholder', placeholderVal);
//     })

// signUpInputs

logoutButton.addEventListener('click', (e) => {
  
  localStorage.removeItem('MEDIUM_ACCESS_TOKEN');
  localStorage.removeItem('MEDIUM_CURRENT_USER_ID');
  window.location.href = "/";
})
profileButton.addEventListener('click', e => {
  window.location.href = `/users/${userId}`
})
writeStoryButton.addEventListener('click', e => {
  window.location.href = '/create'
})
dropdownButton.addEventListener('click', e => {
  dropdownDiv.classList.toggle('clickedDropdownMenu')
})

// const selectAll = document.querySelectorAll
// const likeIcons = document.querySelectorAll(".btnLike")
// const chatIcons = selectAll(".commentIcon")
// const bookmarkIcons = selectAll(".bookmarkIcon")

// likeIcons.forEach(icon => {
//   icon.addEventListener("click", async (ev) => {
//     try {
//       const res = await fetch(`/api/users/${userId}/likes`, {
//         method: "POST",
//         headers: {"Content-Type": "applications/json"},
//         body: JSON.stringify({storyId: })
//       })
//       const result = await res.json()
//       console.log("RESULT\n", result)
//       if (!res.ok) {
//         throw res;
//       }
//     } catch (err) {
//       console.log("caught the like error", err.ok, err)
//       handleErrors(err);
//     }
//     //     likeIcons.classList.toggle(`.liked`)
//   })
// })

document.querySelectorAll('.likeIcon').forEach(like => {
  like.addEventListener('click', e => {
    if (e.target.classList.contains('liked')) {
      e.target.classList.remove('liked')
    } else {
      e.target.classList.add('liked');
    }
  });
});

document.querySelectorAll('.bookmarkIcon').forEach(like => {
  like.addEventListener('click', e => {
    if (e.target.classList.contains('bookmarked')) {
      e.target.classList.remove('bookmarked')
    } else {
      e.target.classList.add('bookmarked');
    }
  });
});

// for the number next to the like icon add the class '.likeCount'
// then add this in the if I just sent:
// document.querySelectorAll('.likeCount').forEach(cnt => {
//         let count = parseInt(cnt.innerHTML);
//         count--;
//         cnt.innerHTML = count;
//       });
// and this in the else:
// document.querySelectorAll('.likeCount').forEach(cnt => {
//         let count = parseInt(cnt.innerHTML);
//         count++;
//         cnt.innerHTML = count;
//       });
