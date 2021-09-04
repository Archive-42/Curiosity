const express = require('express')
const csrf = require('csurf')
const fetch = require('node-fetch')
const { asyncHandler, getCookies, rankStories } = require('../utils')
const { api } = require('../config')
const {
  getUser,
  getStoriesByUser,
  getBookmarkedStoriesForUser,
  getLikesByUser,
  getCommentsByUser,
  getFollowCounts,
  getFollowedUsers,
  getFollowingUsers,
  getStory,
  getAllStories,
  getDiscoveryStories,
  getStoriesByFollowedAuthors,
} = require("../fetches.js")
const { render } = require('pug')

const csrfProtection = csrf({ cookie: true });
const frontEndRouter = express.Router();



//actual splash page
// frontEndRouter.get("/splash", asyncHandler(async (req, res) => {
//   const topics = await fetch("/api/topics")
//   console.log("FETCHED TOPICS", topics)
//   res.render('splash', { title: "MEDAYUM", topics, api });
// }));
//splash page
frontEndRouter.get("/", asyncHandler(async (req, res) => {
    console.log("\nFETCHIN")
    try {
    let stories = await getAllStories()
    const trendingStories = await getDiscoveryStories()
    let bookmarkedStories = await getBookmarkedStoriesForUser(1)
    const isEnoughBookmarks = bookmarkedStories.length >= 6
    let count = 1
    if (isEnoughBookmarks) {
      bookmarkedStories = bookmarkedStories.slice(0, 6)
      bookmarkedStories = bookmarkedStories.map(story => {
        story.rank = count
        count++
        return story
      })
    }
    let topics = await fetch(`${api}/api/topics`)
    topics = await topics.json()
    // console.log("FETCHED", stories, "\nTRENDING", trendingStories)
    res.render('index', {
      title: "MeDaYum Feed",
      stories,
      topics,
      trendingStories,
      bookmarkedStories,
      isEnoughBookmarks,
      api
    });
  } catch (error) {
    res.render('index')
  }
}));



// frontEndRouter.get("/", csrfProtection, asyncHandler(async (req, res) => {
//   const cookies = getCookies(req)
//   console.log("MEDAYUM token", cookies.MEDAYUM_TOKEN)
//   let authCheck = await fetch(`${api}/api/users/user`, {
//     headers: { Authorization: `Bearer ${cookies.MEDAYUM_TOKEN}` }
//   })
//   debugger
//   console.log("\nis authcheck OK?", authCheck.ok)
//   if (authCheck.ok) {
//     let stories = await getAllStories()
//     // let discoveryStories = await getDiscoveryStories()
//     const trendingStories = await getTrendingStories()
//     let bookmarkedStories = await getBookmarkedStoriesForUser(cookies.MEDAYUM_ID)
//     const isEnoughBookmarks = bookmarkedStories.length >= 6
//     if (isEnoughBookmarks) bookmarks = rankStories(bookmarks)
//     console.log("\n\nuserId", cookies.MEDAYUM_ID)
//     res.render("index", {
//       title: "MeDaYum Feed",
//       csrfToken: req.csrfToken(),
//       userId: cookies.MEDAYUM_ID,
//       stories,
//       trendingStories,
//       // discoveryStories,
//       bookmarks,
//       isEnoughBookmarks
//     })
//   } else {
//     console.log("\n\nuserId?", cookies.MEDAYUM_ID)
//     let topics = await fetch(`${api}/api/topics`)
//     topics = await topics.json()
//     // console.log("FETCHED TOPICS", topics)
//     res.render('index', {
//       title: "MeDaYum Splash",
//       topics,
//       api
//     });
//   }
// }));


// display story by id
frontEndRouter.get("/stories/:id(\\d+)", async (req, res) => {
  const storyInfo = await getStory(req);
  console.log(storyInfo);
  res.render('story-layout', { storyInfo, title: storyInfo.title, api });
});


//sign up form
frontEndRouter.get("/sign-up", csrfProtection, (req, res) => {
  res.render('sign-up', { csrfToken: req.csrfToken(), api });
});


//log-in form
frontEndRouter.get("/log-in", csrfProtection, (req, res) => {
  res.render('log-in', { csrfToken: req.csrfToken(), api });
});


//user profile
frontEndRouter.get("/users/:id", csrfProtection, asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  const followCounts = await getFollowCounts(req.params.id)
  const userStories = await getStoriesByUser(req.params.id)
  res.render('profile-tab-stories',
    { csrfToken: req.csrfToken(), user, followCounts, userStories, api });
}))


frontEndRouter.get("/users/:id/comments", csrfProtection, asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  const followCounts = await getFollowCounts(req.params.id)
  const userComments = await getCommentsByUser(req.params.id)
  res.render('profile-tab-comments',
    { csrfToken: req.csrfToken(), user, followCounts, userComments, api });
}))


frontEndRouter.get("/users/:id/likes", csrfProtection, asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  const followCounts = await getFollowCounts(req.params.id)
  const userLikes = await getLikesByUser(req.params.id)
  res.render('profile-tab-likes',
    { csrfToken: req.csrfToken(), user, followCounts, userLikes, api });
}))


frontEndRouter.get("/users/:id/following", csrfProtection, asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  const followCounts = await getFollowCounts(req.params.id)
  const followedUsers = await getFollowedUsers(req.params.id)
  res.render('profile-tab-follows',
    { csrfToken: req.csrfToken(), user, followCounts, followedUsers, api });
}))


frontEndRouter.get("/users/:id/followers", csrfProtection, asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  const followCounts = await getFollowCounts(req.params.id)
  const followingUsers = await getFollowingUsers(req.params.id)
  res.render('profile-tab-followers',
    { csrfToken: req.csrfToken(), user, followCounts, followingUsers, api });
}))


frontEndRouter.get("/users/:id/bookmarks", csrfProtection, asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  const followCounts = await getFollowCounts(req.params.id)
  const bookmarkedStories = await getBookmarkedStoriesForUser(req.params.id)
  res.render('profile-tab-bookmarks',
    { csrfToken: req.csrfToken(), user, followCounts, bookmarkedStories, api });
}))

//edit user profile form
// frontEndRouter.get("/users/:id/edit", csrfProtection, (req, res) => {
//   res.render('edit-profile', { csrfToken: req.csrfToken() });
// });
//create new story form
frontEndRouter.get("/create", csrfProtection, (req, res) => {
  res.render('create', { csrfToken: req.csrfToken(), api });
});


//display story edit form
frontEndRouter.get("/stories/:id/edit", csrfProtection, (req, res) => {
  res.render('story-edit-layout', { csrfToken: req.csrfToken(), api });
});


//sign up form
frontEndRouter.get("/sign-up", csrfProtection, (req, res) => {
  res.render('sign-up', { csrfToken: req.csrfToken(), title: "Sign Up", api });
});


//log-in form
frontEndRouter.get("/log-in", csrfProtection, (req, res) => {
  res.render('log-in', { csrfToken: req.csrfToken(), title: "Log In", api });
});


//user profile
frontEndRouter.get("/users", (req, res) => {
  res.render('profile', { title: "Profile", api });
});


//edit user profile form
frontEndRouter.get("/users/:id(\\d+)/edit", csrfProtection, (req, res) => {
  res.render('edit-profile', { csrfToken: req.csrfToken(), title: "Edit Profile", api });
});


//create new story form
frontEndRouter.get("/create", csrfProtection, (req, res) => {
  res.render('create', { csrfToken: req.csrfToken(), title: "Create a Story", api });
});


//display story edit form
frontEndRouter.get("/stories/:id(\\d+)/edit", csrfProtection, (req, res) => {
  res.render('story-edit-layout', { csrfToken: req.csrfToken(), title: "Edit Story", api });
});


//display feed
frontEndRouter.get("/feed", csrfProtection, asyncHandler(async (req, res) => {
  res.render('feed', { title: "My Feed", csrfToken: req.csrfToken(), stories, api });
}));


//throw error
frontEndRouter.get("/error-test", (req, res, next) => {
  const err = new Error("500 Internal Server Error.");
  err.status = 500;
  err.title = "custom 500 error";
  next(err);
})

module.exports = frontEndRouter;
