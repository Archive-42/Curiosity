const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const { getUserToken, requireAuth } = require("../security");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utility");
const { User, Comment, Board, Bookmark } = require("../../db/models");
const { DateTime } = require("luxon");

//#region  Utilities

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

// *** Function for Sorting Grid by Equipped Total O(n) + O(n log n)***
const sort = (arr) => {
  let equipped = [];
  let empty = [];
  arr.forEach((e) => {
    if (e.items) {
      equipped.push(e);
    } else {
      empty.push(e);
    }
  });
  equipped.sort((a, b) => b.items.length - a.items.length);
  return [...equipped, ...empty];
};

const validateUsername = check("username")
  .exists({ checkFalsy: true })
  .withMessage("Please enter a Username.");

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please enter a Valid Email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please enter a Password."),
  handleValidationErrors,
];
//#endregion

// *** Create New User ***
userRouter.post(
  "/",
  validateUsername,
  validateEmailAndPassword,
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(
      r({
        username: username,
        email: email,
        hashedPassword: hashedPassword,
        userIcon: "none",
        rank: "unranked",
        verified: false,
      })
    );
    await newUser.save();
    const { token } = getUserToken(newUser);

    if (newUser) {
      res.json({ user: newUser.toSafeObject(), token });
    }
  })
);

// *** Login and Create Session ***
userRouter.put(
  "/session",
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }
    const { token, jti } = getUserToken(user);
    user.tokenId = jti;
    await user.save();
    res.cookie("token", token);
    res.json({ token, user: user.toSafeObject() });
  })
);

// *** Remove Session ***
userRouter.delete(
  "/session",
  requireAuth,
  asyncHandler(async (req, res) => {
    req.user.tokenId = null;
    await req.user.save();
    res.json({ message: "Logout Successful!" });
  })
);

// *** Return Data of Specific User ***
userRouter.get(
  "/id/:id",
  asyncHandler(async (req, res) => {
    await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["hashedPassword"],
      },
      include: [
        {
          model: User,
          as: "Followers",
          attributes: ["id"],
        },
        {
          model: User,
          as: "Following",
          attributes: ["id"],
        },
        {
          model: Board,
          as: "Boards",
        },
        {
          model: Board,
          as: "Bookmarkers",
        },
        {
          model: Comment,
        },
      ],
    }).then((e) => {
      const resObj = Object.assign(
        {},
        {
          user: {
            id: e.id,
            username: e.username,
            icon: e.userIcon,
            rank: e.rank,
            verified: e.verified,
            joined: new DateTime(e.createdAt).toLocaleString(
              DateTime.DATE_FULL
            ),
            followerCount: e.Followers.length,
            followingCount: e.Following.length,
          },

          boards: (() => {
            const resObj = {};
            [...e.Boards, ...e.Bookmarkers].forEach((board) => {
              resObj[board.id] = {
                title: board.title,
                subtitle: board.subtitle,
                authorId: board.authorId,
                grid: sort(board.grid),
                actives: board.actives,
                cover: board.grid.filter(
                  (e) => e.items && e.items.length === 3
                ),
              };
            });
            return resObj;
          })(),
          comments: e.Comment,
        }
      );
      res.status(200).json(resObj);
    });
  })
);

// *** Add a Board to Collection ***
userRouter.post(
  "/id/:id/boards",

  asyncHandler(async (req, res) => {
    console.log("*******REEQUEST", req);
    const { boardId } = req.body;
    await Bookmark.create(r({ boardId: boardId, followerId: req.params.id }));
    res.status(200).send("Board added to Collection!");
  })
);

// *** Remove a Board from Collection  ***
userRouter.delete(
  "/id/:id/boards",

  asyncHandler(async (req, res) => {
    const { boardId } = req.body;
    await Bookmark.destroy({
      where: {
        boardId: boardId,
        followerId: req.params.id,
      },
    });
    res.status(201).send("Board Successfully Removed from Collection!");
  })
);

module.exports = userRouter;
