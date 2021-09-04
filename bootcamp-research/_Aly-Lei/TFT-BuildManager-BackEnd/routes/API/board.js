const express = require("express");
const boardRouter = express.Router();
const { requireAuth } = require("../security");
const { asyncHandler } = require("../utility");
const { Board, User, SubBoard } = require("../../db/models");
const { Op } = require("sequelize");

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

// *** POST New Board ***
boardRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const newBoard = await Board.create(r(req.body));
    await newBoard.save();
    res.status(201).json({ newBoard });
  })
);

// *** POST New SubBoard ***
boardRouter.post(
  "/id/:id/subBoard",
  asyncHandler(async (req, res) => {
    const newSub = await SubBoard.create(r(req.body));
    await newSub.save();
    res.status(201).json({ newSub });
  })
);

// *** Retrieve all Boards ***
boardRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await Board.findAll({
      include: {
        model: User,
        as: "Creator",
        attributes: {
          exclude: ["hashedPassword"],
        },
      },
    });
    res.status(200).json(data);
  })
);

// *** Retrieve all Community Boards ***
boardRouter.get(
  "/community",
  asyncHandler(async (req, res) => {
    await Board.findAll({
      where: {
        [Op.not]: { authorId: 1 },
      },
      include: [
        {
          model: User,
          as: "Creator",
          attributes: {
            exclude: "hashedPassword",
          },
        },
      ],
    }).then((boards) => {
      const resObj = {};
      boards.forEach((board) => {
        resObj[board.id] = {
          title: board.title,
          subtitle: board.subtitle,
          authorId: board.authorId,
          grid: sort(board.grid),
          actives: board.actives,
          author: board.Creator.username,
        };
      });

      res.status(200).json(resObj);
    });
  })
);

// *** Retrieve all Editor Boards ***
boardRouter.get(
  "/meta",
  asyncHandler(async (req, res) => {
    await Board.findAll({
      where: {
        authorId: 1,
      },
      include: [
        {
          model: User,
          as: "Creator",
          attributes: {
            exclude: "hashedPassword",
          },
        },
      ],
    }).then((boards) => {
      const resObj = {};
      boards.forEach((board) => {
        resObj[board.id] = {
          title: board.title,
          subtitle: board.subtitle,
          authorId: board.authorId,
          grid: sort(board.grid),
          actives: board.actives,
          author: board.Creator.username,
        };
      });
      res.status(200).json(resObj);
    });
  })
);

// *** GET a specific Board via ID || Including Author Info ***
boardRouter.get(
  "/id/:id",
  asyncHandler(async (req, res) => {
    const data = await Board.findOne({
      where: {
        id: req.params.id,
      },

      include: [
        {
          model: User,
          as: "Creator",
          attributes: {
            exclude: ["hashedPassword"],
          },
        },
        {
          model: SubBoard,
        },
      ],
    });
    data.grid = sort(data.grid);
    res.status(200).json(data);
  })
);

// *** Delete a Board ***
boardRouter.delete(
  "/id/:id",
  asyncHandler(async (req, res) => {
    await Board.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).send("Board Succesfully");
  })
);

// *** Add or Edit Guide Column of Board ***
boardRouter.put(
  "/id/:id",
  asyncHandler(async (req, res) => {
    const { content } = req.body;
    Board.update(
      { guide: content },
      { returning: true, where: { id: req.params.id } }
    ).then(([update, updatedBoard]) => {
      res.json(updatedBoard);
    });
  })
);

module.exports = boardRouter;
