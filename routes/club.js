const express = require("express");
const router = express.Router();
const clubModel = require("./../models/Club.js");
const teamModel = require("./../models/Team.js");
const eventModel = require("./../models/Event.js");
const uploader = require("./../config/cloudinary");

//  --------------------------------------
// ROUTES PREFIX IS    /api/club
//  --------------------------------------

// GET ALL CLUBS

router.get("/", (req, res) => {
  clubModel
    .find()
    .select("-password")
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// CLUB GET INFOS

router.get("/:id", (req, res) => {
  clubModel
    .findById(req.params.id)
    .select("-password")
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// CLUB EDIT ACCOUNT

router.patch("/:id", uploader.single("image"), (req, res) => {
  const updatedInfos = req.body;

  if (req.file) updatedInfos.image = req.file.path;

  clubModel
    .findByIdAndUpdate(req.params.id, updatedInfos, { new: true })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// CLUB DELETE ACCOUNT
// TODO: display confirmation pop up on the front end before getting to this route

router.delete("/:id", (req, res) => {
  Promise.all([
    teamModel
      .deleteMany({ club: req.params.id })
      .then((dbRes) => console.log("deleted teams", dbRes)),
    eventModel
      .deleteMany({ club: req.params.id })
      .then((dbRes) => console.log("deleted events", dbRes)),
  ])
    .then(() => {
      clubModel
        .findByIdAndRemove(req.params.id)
        .then(() => {
          res.sendStatus(204);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
