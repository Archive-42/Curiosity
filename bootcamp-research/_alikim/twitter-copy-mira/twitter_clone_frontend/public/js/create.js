

const form = document.querySelector(".create-form")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  const formData = new FormData(form)
  const message = formData.get("message")
  const body = { message }

  try {
    const response = await fetch("http://localhost:8084/tweets", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem(
          "TWITTER_LITE_ACCESS_TOKEN")}`
      }
    })
    console.log("we fetched a thing in create.js", response)
    if (response.status === 401) {
      window.location.href = "/log-in"
    } else if (!response.ok) {
      console.log("not okay?! D: ", response.ok)
      throw response
      // throw new Error("Please login! :) ")
    } else {
      window.location.href = "/" // TODO QUESTION What is this?

    }
  } catch (error) {
    if (error.status >= 400 && error.status < 600) {
      const errorJSON = await error.json()
      const errorsContainer = document.querySelector('.errors-container')
      let errorsHtml = [
        `
        <div class="alert alert-danger">
            Something went wrong. Please try again.
        </div>
      `,
      ]
      const { errors } = errorJSON
      if (errors && Array.isArray(errors)) {
        errorsHtml = errors.map(
          (message) => `
          <div class="alert alert-danger"
            ${message}
          </div>
        `
        )
      }
      errorsContainer.innerHTML = errorsHtml.join("")
    } else {
      alert("There's a problem I dunno.")
    }
  }
})
