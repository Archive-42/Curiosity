









































// document.addEventListener('DOMContentLoaded', () => {
//     let catPicEle = document.getElementsByClassName('cat-pic')[0];
//     let newPicEle =  document.getElementById('new-pic');
//     let loaderEle = document.getElementsByClassName('loader')[0];
//     let upvoteEle = document.getElementById('upvote');
//     let downvoteEle = document.getElementById('downvote');
//     let scoreEle = document.getElementsByClassName('score')[0];
//     let formEle = document.getElementsByClassName('comment-form')[0];
//     let divEle, delEle;

//     fetchImage();

//     // Form submit listener
//     formEle.addEventListener("submit", (event) => {
//         let newForm = new FormData(formEle);
//         let newComment = newForm.get("user-comment");
//         event.preventDefault();
//         const textEle = document.getElementById("user-comment");
//         const commentsEle = document.getElementsByClassName("comments")[0];
//         // commentsEle.innerHTML += `${textEle.value} </br>`
//         // textEle.value = "";
//         fetch("/kitten/comments", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ "comment": newComment })
//         }).then (res => {
//             if(!res.ok) {
//                 throw res
//             }
//             return res.json();
//         }).then (data => {
//             commentsEle.innerHTML = ``;
//             for (let i = 0; i < data.comments.length; i++) {
//                 divEle = document.createElement("div");
//                 delEle = document.createElement("button");
//                 divEle.setAttribute("id", `div-${i}`);
//                 delEle.setAttribute("id", `del-${i}`);
//                 delEle.innerHTML = `DELETE`;
//                 divEle.innerHTML = data.comments[i];
//                 divEle.appendChild(delEle);
//                 //console.log(Array.isArray(data.comments));
//                 commentsEle.appendChild(divEle);// += divEle.innerHTML;

//             }
//         })
//     })


//     // Fetches a new image
//     newPicEle.addEventListener("click", () => {
//         fetchImage();
//         loaderEle.innerHTML = "Loading...";
//     });

//     // Upvotes kitty
//     upvoteEle.addEventListener("click", () => {
//         fetch("kitten/upvote", {
//             method: "PATCH",
//         })
//             .then(res => {
//                 if (!res.ok) {
//                     throw res;
//                 }
//                 return res.json();
//             })
//             .then(data => {
//                 scoreEle.innerHTML = data.score;
//             })
//             .catch(err => {
//                 err.json().then(errorJSON => {
//                     alert(errorJSON.message);
//                 })
//             });
//     });

//     downvoteEle.addEventListener('click', () => {
//         fetch("kitten/downvote", {
//             method: "PATCH",
//         })
//             .then(res => {
//                 if (!res.ok) {
//                     throw res;
//                 }
//                 return res.json();
//             })
//             .then(data => {
//                 scoreEle.innerHTML = data.score;
//             })
//             .catch(err => {
//                 err.json().then(errorJSON => {
//                     alert(errorJSON.message);
//                 })
//             });
//     });

//     function fetchImage() {
//         fetch("/kitten/image")
//         .then(res => {
//             if (!res.ok) {
//                 throw res;
//             }
//             return res.json();
//         })
//         .then(data => {
//             catPicEle.setAttribute('src', data.src);
//             catPicEle.setAttribute('height', '512px');
//             catPicEle.setAttribute('width', '394px');
//             scoreEle.innerHTML = data.score;
//             loaderEle.innerHTML = '';
//         })
//         .catch(err => {
//             err.json().then(errorJSON => {
//                 alert(errorJSON.message);
//             })
//             loaderEle.innerHTML = '';
//         });
//     }
// });
