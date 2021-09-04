const { validationResult } = require("express-validator")
const { User, Story, Comment, Like, Topic, Tag } = require("./db/models");

function asyncHandler(handler) {
  return (req, res, next) => {
    return handler(req, res, next).catch(next)
  }
}


function getCookies(cookies) {
  if (cookies) {
    const rawCookies = cookies.split("; ");
    const bakedCookies = {}
    rawCookies.forEach(cookie => {
      const bakedCookie = cookie.split("=")
      bakedCookies[bakedCookie[0]] = bakedCookie[1]
    })
    return bakedCookies
  }
  return {}
}

function deleteCookies() {
  const rawCookies = document.cookie.split("; ")
  rawCookies.forEach(cookie => {
    const localHostName = window.location.hostname.split(".")
    while (localHostName.length > 0) {
      const cookieBase = encodeURIComponent(rawCookies[cookie]
        .split(";")[0].split("=")[0]) + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" + localHostName.join(".") + " ;path="
      const path = location.pathname.split('/')
      document.cookie = cookieBase + "/"
      while (path.length > 0) {
        document.cookie = cookieBase + path.join("/")
        path.pop()
      }
      localHostName.shift()
    }
  })
}


function handleValidationErrors(req, res, next) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map(error => error.msg);
    const err = Error("Bad request.");
    err.errors = errors;
    err.title = "400 Bad request.";
    err.status = 400;
    return next(err);
  } else next();
}


function contentNotFound(id, contentType) {
  const err = new Error(`${contentType} id ${id} could not be found.`);
  err.title = `404 ${contentType} not found`;
  err.status = 404;
  return err;
}


async function deleteForStory(id, Model) {
  const records = await Model.findAll({ where: { storyId: id } })
  console.log(records)
  records.forEach(async record => await record.destroy())
}


async function checkForStory(req, res, next) {
  const story = await Story.findByPk(req.params.id)
  if (!story) next(contentNotFound(req.params.id, "Story"))
  else {
    req.story = story
    next()
  }
}


async function checkForUser(req, res, next) {
  const user = await User.findByPk(req.params.id)
  if (!user) next(contentNotFound(req.params.id, "User"))
  else {
    req.user = user
    next()
  }
}


async function checkForComment(req, res, next) {
  const comment = await Comment.findByPk(req.params.id)
  if (!comment) next(contentNotFound(req.params.id, "Comment"))
  else {
    req.comment = comment
    next()
  }
}


// Provide a 'createdAt' value and receive a string in form 'Jan 01 2020'
function getDate(createdAt) {
  let parsedDate = new Date(createdAt)
  return parsedDate.toDateString().slice(4)
}


// Provide list of objects with 'createdAt' property to update to form 'Jan 01 2020'.
function getDates(content) {
  return content.map(item => {
    item.createdAt = getDate(item.createdAt)
    return item
  })
}


function rankStories(stories) {
  let count = 1
  stories = stories.slice(0, 6)
  return stories.map(story => {
    story.rank = count
    count++
    return story
  })
}


const userAttributes = ["id", "firstName", "lastName", "bio"]
const storyAttributes = ["id", "title", "subtitle", "createdAt", "authorId"]


const storyInclude = [{
  model: User,
  as: "Author",
  attributes: userAttributes
}, {
  model: Comment,
  attributes: ["id"],
}, {
  model: Like,
  attributes: ["id"]
}, {
  model: Tag,
  attributes: ["topicId"],
  include: { model: Topic, attributes: ["id", "topic"] }
}]


module.exports = {
  asyncHandler,
  getCookies,
  deleteCookies,
  handleValidationErrors,
  contentNotFound,
  deleteForStory,
  checkForStory,
  checkForUser,
  checkForComment,
  storyInclude,
  userAttributes,
  storyAttributes,
  getDate, getDates,
  rankStories
}
