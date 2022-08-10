const { json } = require("express");
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const verify = require("../verifytoken.js");

//Create

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const saveMovie = await newMovie.save();

      res.status(200).json(saveMovie);
    } catch (error) {
      res.status(500), json(error);
    }
  } else {
    res.status(403).json("you are not allowed");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const UpdateMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(UpdateMovie);
    } catch (error) {
      res.status(500), json(error);
    }
  } else {
    res.status(403).json("you are not allowed");
  }
});

//DElete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);

      res.status(200).json("The mOVIE HAS BEEN DELETED");
    } catch (error) {
      res.status(500), json(error);
    }
  } else {
    res.status(403).json("you are not allowed");
  }
});

//GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    res.status(200).json(movie);
  } catch (error) {
    res.status(500), json(error);
  }
});

//GET random
router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type == "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    }
    else{
        movie=await Movie.aggregate(
            [
                {$match:{isSeries:false}},
                {$sample:{size:1}},
            ]
        )
    }

    res.status(200).json(movie)
  } catch (error) {
    res.status(500), json(error);
  }
});

//getall
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const movies=await Movie.find();
  
        res.status(200).json(movies.reverse());
      } catch (error) {
        res.status(500), json(error);
      }
    } else {
      res.status(403).json("you are not allowed");
    }
  });

module.exports = router;
