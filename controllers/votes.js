const express = require("express");
const router = express.Router();

const Vote = require("../models/vote");

async function create(req, res, next) {
  try {
    let newVote = await Vote.create(req.body);
    if (req.user.role != "admin") return;
    req.params.bookId
      ? (newVote.book = req.params.bookId)
      : req.params.noteId
      ? (newVote.note = req.params.noteId)
      : newVote;
    await newVote.save();
    res.redirect(`${req.body.list ? "/lists/"+req.body.list : "/lists"}`);
  } catch (err) {
    console.error(err);
  }
}

async function deleteVote(req, res, next) {
  try {
    await Vote.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  create,
  delete: deleteVote,
};
