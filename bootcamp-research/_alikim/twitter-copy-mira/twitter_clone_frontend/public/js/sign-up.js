

const signUpForm = document.querySelector(".sign-up-form")

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault()
  const formData = new FormData(signUpForm)

  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const body = { email, password, username };

  try {
    const res = await fetch("http://localhost:8084/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
    })

    if (!res.ok) {
      console.log('res not okay!! signup', res)
      throw res;
    }

    const {
      token,
      user: { id }
    } = await res.json();

    localStorage.setItem("TWITTER_LITE_ACCESS_TOKEN", token);
    localStorage.setItem("TWITTER_LITE_CURRENT_USER_ID", id);
    window.location.href = "/"

  } catch (err) {
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json()
      const errorsContainer = document.querySelector(".errors-container")
      let errorsHtml = [
        `
        <div class="alert alert-danger">
          Something's wrong.
        </div>
        `,
      ]

      const { errors } = errorJSON

      if (errors && Array.isArray(errors)) {
        errorsHtml = errors.map(
          (message) => `
          <div class="alert alert-danger">
            ${message}
          </div>
          `
        )
      }
      errorsContainer.innerHTML = errorsHtml.join("")
    } else {
      console.log("error caught", err)
      alert(`Uh oh there's a problem. Internet connect bad?`) // TODO We need to be okay.
    }
  }
  // Signup logic
})
