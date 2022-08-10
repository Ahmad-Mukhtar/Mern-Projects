const { json } = require("express");
const express = require("express");
const router = express.Router();
const List = require("../models/List");
const verify = require("../verifytoken.js");

//Create

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const saveList = await newList.save();

      res.status(200).json(saveList);
    } catch (error) {
      res.status(500), json(error);
    }
  } else {
    res.status(403).json("you are not allowed");
  }
});

//Delete

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      await List.findById(req.params.id);

      res.status(200).json("List Deleted");
    } catch (error) {
      res.status(500), json(error);
    }
  } else {
    res.status(403).json("you are not allowed");
  }
});

//Get
router.get("/", verify, async (req, res) => {
  const typequery = req.query.type;
  const genrequery = req.query.genre;
  let list = [];
  try {
    if (typequery) {
      if (genrequery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typequery, genre: genrequery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typequery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
