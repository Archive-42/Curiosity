// LOAD CAT PHOTO ONLOAD //
window.addEventListener("DOMContentLoaded", async (event) => {
	const response = await fetch("/kitten/image");
	const json = await response.json();
	try {
		if (!response.ok) throw Error(json);
		document.querySelector(".cat-pic").src = json.src;
	} catch (error) {
		document.querySelector(".error").innerHTML = json.message;
	}
});

// LOAD RANDOM CAT PHOTO ON NEW-PIC CLICK //
document.getElementById("new-pic").addEventListener("click", async (event) => {
	document.querySelector(".error").innerHTML = "";
	document.querySelector(".loader").innerHTML = "LOADING...";
	const response = await fetch("/kitten/image");
	document.querySelector(".loader").innerHTML = "";
	const json = await response.json();
	try {
		if (!response.ok) throw Error(json);
		document.querySelector(".cat-pic").src = json.src;
	} catch (error) {
		document.querySelector(".cat-pic").src = "json.src";
		document.querySelector(".error").innerHTML = json.message;
	}
});

// INCREMENT LIKES //
async function updateScore(response) {
	const json = await response.json();
	try {
		if (!response.ok) throw Error(json);
		document.querySelector(".score").innerHTML = json.score;
	} catch (error) {
		document.querySelector(".error").innerHTML = json.message;
	}
}

// DECREMENT LIKES //
document.getElementById("upvote").addEventListener("click", async (event) => {
	const response = await fetch("/kitten/upvote", { method: "PATCH" });
	updateScore(response);
});

document.getElementById("downvote").addEventListener("click", async (event) => {
	const response = await fetch("/kitten/downvote", { method: "PATCH" });
	updateScore(response);
});


// HANDLE COMMENT SUBMISSION EVENT //
document.getElementById("submit").addEventListener("click", async (event) => {
	event.preventDefault();
	const form = new FormData(document.querySelector(".comment-form"));
  const comment = form.get("user-comment");
	const response = await fetch("/kitten/comments", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ comment }),
	});
  const json = await response.json();

	try {
		if (!response.ok) throw Error(json);
    renderComments(json);
	} catch (e) {
		let comment = document.createElement("p");
		comment.innerHTML = "something bad happened";
		commentBlock.appendChild(comment);
	}
});


// ADD DELETE BUTTON HELPER FUNCTION //
function addDeleteButton(node, i) {
  let delButton = document.createElement("button");
  delButton.setAttribute("class", "delete");
  delButton.setAttribute('id', `${i}`)
  delButton.innerText = "delete comment";
  node.appendChild(delButton);
}


// ADD COMMENT RENDERING HELPER FUNCTION //
function renderComments(json) {
  const commentBlock = document.querySelector(".comments");
  commentBlock.innerHTML = '';

  json.comments.forEach((comment, i) => {
    let currComm = document.createElement("div");
    currComm.innerHTML = comment + " ";
    addDeleteButton(currComm, i)
    commentBlock.appendChild(currComm);
  })
}


// COMMENT DELETION LISTENER //
document.querySelector(".comments").addEventListener('click', async(event) =>{
    if(event.target.tagName === "BUTTON"){
      let id = event.target.id
      let response = await fetch("/kitten/comments/:id", {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id })
      });
      let json = await response.json();
      renderComments(json);
    }
})
