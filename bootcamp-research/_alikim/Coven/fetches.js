const fetch = require("node-fetch")
const { getDate, getDates, rankStories } = require("./utils")
const { api } = require('./config')


// Fetch User by id without password info.
async function getUser(id) {
  let user = await fetch(`${api}/api/users/${id}`)
  user = await user.json()
  user.createdAt = getDate(user.createdAt)
  return user
}
// Fetch array of Stories by Author id and convert 'createdAt' to be readable.
async function getStoriesByUser(id) {
  let stories = await fetch(`${api}/api/users/${id}/stories`)
  stories = await stories.json()
  stories = getDates(stories)
  return stories
}
async function getStoriesByFollowedAuthors(userId) {
  let stories = await fetch(`${api}/api/users/${userId}/followed/stories`)
  stories = await stories()
  return getDates(stories)
}

async function getStory(id) {
  let story = await fetch(`${api}/api/stories/${id}`)
  story = await story.json()
  story.createdAt = getDate(story.createdAt)
  return story
}
async function getAllStories() {
  let stories = await fetch(`${api}/api/stories`)
  stories = await stories.json()
  return getDates(stories)
}
async function getDiscoveryStories() {
  let stories = await fetch(`${api}/api/stories/discover`)
  stories = await stories.json()
  stories = getDates(stories)
  return rankStories(stories)
}


async function getFollowCounts(id) {
  let follows = await fetch(`${api}/api/users/${id}/follows`)
  return await follows.json()
}
async function getFollowedUsers(id) {
  let followedUsers = await fetch(`${api}/api/users/${id}/followed`)
  return await followedUsers.json()
}
async function getFollowingUsers(id) {
  let followingUsers = await fetch(`${api}/api/users/${id}/followers`)
  return await followingUsers.json()
}

async function getBookmarkedStoriesForUser(id) {
  let bookmarks = await fetch(`${api}/api/users/${id}/bookmarks`)
  bookmarks = await bookmarks.json()
  bookmarks = bookmarks.map(bookmark => {
    bookmark.Story.createdAt = getDate(bookmark.Story.createdAt)
    return bookmark
  })
  return bookmarks
}

// Fetch array of Stories Liked by User and convert 'createdAt' to be readable.
async function getLikesByUser(id) {
  let likes = await fetch(`${api}/api/users/${id}/likes`)
  likes = await likes.json()
  likes = getDates(likes)
  return likes.map(like => {
    like.Story.createdAt = getDate(like.Story.createdAt)
    return like
  })
}

// COMMENTS
// Fetch array of Comments by User (id) with associated Stories
async function getCommentsByUser(id) {
  let comments = await fetch(`${api}/api/users/${id}/comments`)
  comments = await comments.json()
  return getDates(comments)
}
async function getCommentsForStory(id) {
  let comments = await fetch(`${api}/api/stories/${id}/comments`)
  comments = await comments.json()
  comments = getDates(comments)
  return comments
}

module.exports = {
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
  getCommentsForStory,
}