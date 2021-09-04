window.addEventListener('DOMContentLoaded', async () => {
  const tweetsContainer = document.getElementById('tweets-container');
  try {
    const res = await fetch("http://localhost:8080/tweets", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("TWITTER_LIGHT_ACCESS_TOKEN")}`,
      },
    });

    if (res.status === 401) {
      window.location.href = '/log-in';
      return;
    } else {
      const { tweets } = await res.json();
      const tweetsHtml = tweets.map(
        ({ message }) => `
        <div class="card">
          <div class="card-body">
            <p class="card-text">${message}</p>
          </div>
        </div>
      `);

      tweetsContainer.innerHTML = tweetsHtml.join('');
    }
  } catch (err) {
    console.error(err);
  }
});
