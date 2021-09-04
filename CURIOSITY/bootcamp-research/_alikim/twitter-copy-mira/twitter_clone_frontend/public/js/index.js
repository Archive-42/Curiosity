document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:8084/tweets", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "TWITTER_LITE_ACCESS_TOKEN"
        )}`
      }
    })
    
    if (res.status === 401) {
      window.location.href = "/log-in"
    }

    const { tweets } = await res.json()
    console.log("tweets from res.json()", tweets)
    console.log("status", res.status, res)
    const tweetsContainer = document.getElementById("tweets-container");
    const tweetsHtml = tweets.map(({ message, user: { username } }) => `
      <div class="card">
        <div class="card-header">
          ${ username }
        </div>
        
        <div class="card-body">
          <p class="card-text">${message}</p>
        </div>
      </div>
    `)
    tweetsContainer.innerHTML = tweetsHtml.join("")
    // res.redirect("/log-in"); // ?????
  } catch (e) {
    console.error(e)
  }
})


console.log("Hello from index.js!");
