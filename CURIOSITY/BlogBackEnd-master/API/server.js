const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const logger = require("../middleware/logger");

const usersRouter = require("../endpoints/users/userRouter");
const loginRouter = require("../auth/loginRouter.js");
const registerRouter = require("../auth/registerRouter.js");

const authorsRouter = require("../endpoints/authors/authorsRouter.js");
const postsRouter = require("../endpoints/posts/postsRouter.js");
const tagsRouter = require("../endpoints/tags/tagsRouter.js");
const pingRouter = require("../ping/pingRouter.js");
const popularRouter = require("../endpoints/popular/popularRouter.js");
const server = express();

server.use(helmet());
server.use(logger);
server.use(express.json());
server.use(cors());

// standard auth routers
server.use("/api/login", loginRouter);
server.use("/api/register", registerRouter);
server.use("/api/users", usersRouter);
// authors router
server.use("/api/authors", authorsRouter);

// posts router
server.use("/api/posts", postsRouter);

// tags router
server.use("/api/tags", tagsRouter);

// poststags router (links tags to posts)
server.use("/api/poststags", tagsRouter);

// ping endpoint
server.use("/api/ping", pingRouter);

// popular router (list sorted by most liked & most read)
server.use("/api/popular", popularRouter);

// unsecured/unlogged-in response
server.get("/", (req, res) => {
  res.send(
    "<h1>🎣  You must log in to view users, posts, authors, and tags.</h1>"
  );
});

module.exports = server;
