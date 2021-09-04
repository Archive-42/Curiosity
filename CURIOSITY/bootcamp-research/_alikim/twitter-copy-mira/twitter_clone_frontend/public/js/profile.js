window.addEventListener("DOMContentLoaded", async (event) => {
  const id = localStorage.getItem("TWITTER_LITE_CURRENT_USER_ID");
  const token = localStorage.getItem("TWITTER_LITE_ACCESS_TOKEN")
  try {
    const res = await fetch(`http://localhost:8084/users/${id}/tweets`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    if (res.status === 401) {
      window.location.href = "/log-in"
      return // this should return outside the function
    } else {
      console.log("profile res", res)
      const { tweets } = await res.json() // MIRA .json() must be awaited!
      console.log("profile tweets", tweets)
      const tweetsContainer = document.querySelector(".tweets-container")
      const tweetsHtml = tweets.map(
        ({ message, id }) => `
          <div class="card" id="tweet-${id}">
            <div class="card-body">
              <p class="card-text">${message}</p>
            </div>
          </div>
        `
      )
      tweetsContainer.innerHTML = tweetsHtml.join("")
    }
  } catch (error) {
    console.error(error)
  }
});
