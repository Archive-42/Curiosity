window.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.log-in-form');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');
    const body = { email, password };

    try {
      const res = await fetch("http://localhost:8080/users/token", {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw res;
      }
      const { token, user: { id } } = await res.json();

      localStorage.setItem("TWITTER_LIGHT_ACCESS_TOKEN", token);
      localStorage.setItem("TWITTER_LIGHT_CURRENT_USER_ID", id);

      window.location.href = '/';
    } catch(err) {
      if (err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
        const errorsContainer = document.querySelector('.errors-container');
        let errorHtml = [
          `
            <div class="alert alert-danger">
              Something went wrong. Please try again.
            </div>
          `,
        ];
        const { errors } = errorJSON;

        if (errors && Array.isArray(errors)) {
          errorsHtml = errors.map(
            (message) => `
              <div class="alert alert-danger">
                ${message}
              </div>
            `
          );
        }

        errorsContainer.innerHTML = errorsHtml.join('');
      } else {
        alert(`Something went wrong. Please check your internet connection and try again.`);
      }
    }
  });
});
