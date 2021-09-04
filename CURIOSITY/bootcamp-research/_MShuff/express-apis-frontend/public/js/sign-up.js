window.addEventListener('DOMContentLoaded', () => {
  const signUpForm = document.querySelector('.sign-up-form');

  signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(signUpForm);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const body = { username, password, email };

    try {
      const res = await fetch("http://localhost:8080/users", {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw res;
      }

      const { token, user: { id }, } = await res.json();

      localStorage.setItem("TWITTER_LIGHT_ACCESS_TOKEN", token);
      localStorage.setItem("TWITTER_LIGHT_CURRENT_USER_ID", id);

      window.location.href = '/';
    } catch(err) {
      if (err.status >= 400 && err.status < 600) {  // Errors between 400-599
        const errorJSON = await err.json();
        const { errors } = errorJSON;
        const errorsContainer = document.querySelector('.errors-container');
        let errorsHtml = [
          `
            <div class="alert alert-danger">
              Something went wrong. Please try again.
            </div>
          `,
        ];

        if (errors && Array.isArray(errors)) {
          errorsHtml = errors.map(
            (message) => `
            <div class="alert alert-danger">
              ${message}
            </div>
            `
          );

          errorsContainer.innerHTML = errorsHtml.join("");
        }
      } else {
        alert(`Something went wrong. Please check your internet connection and try again.`);
      }
    }
    // Sign-Up logic
  });
});
