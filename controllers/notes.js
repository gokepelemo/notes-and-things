const express = require("express");
const router = express.Router();

const Defaults = require("../models/defaults");
const Note = require("../models/note");
const Book = require("../models/book");
const Vote = require("../models/vote");
const User = require("../models/user");

function show(req, res, next) {
  return;
}

function editNote(req, res, next) {
  return;
}

async function index(req, res, next) {
  let notes, notesTitle, type, userData;
  if (req.params.userId) {
    type = `user`;
    notes = await Note.find({ user: req.params.userId }).populate("user").populate("list");
    userData = await User.findById(req.params.userId);
    notesTitle = `Notes from ${userData.name}`;
  } else if (req.params.listId) {
    type = `list`;
    notes = await Note.find({ list: req.params.listId }).populate("user").populate("list");
    notesTitle = `Notes from List`;
  } else {
    type = `all`;
    notes = await Note.find({}).populate("user").populate("list");
    notesTitle = `All Notes`;
  }
  try {
    res.render("notes/index", {
      app: Defaults,
      title: notesTitle,
      note: notes,
      type: type,
      userData: userData,
    });
  } catch (err) {
    console.error(err);
  }
}

async function create(req, res, next) {
  try {
    let newNote = await Note.create(req.body);
    req.body.list
      ? res.redirect(`/lists/${req.body.list}`)
      : res.redirect(`/books/${req.body.book}`);
  } catch (err) {
    console.error(err);
  }
}

function update(req, res, next) {
  return;
}

async function deleteNote(req, res, next) {
  try {
    let note = await Note.findByIdAndDelete(req.params.id);
    let votes = await Vote.find({ note: req.params.id });
    for (let i = 0; i < votes.length; i++) {
      let voteId = votes[i].id;
      await Vote.findByIdAndDelete(voteId);
    }
    res.redirect("/notes");
  } catch (err) {
    console.error(err);
  }
}

async function newNote(req, res, next) {
  try {
    let book = await Book.findById(req.params.id);
    res.render("notes/new", {
      app: Defaults,
      book: book,
      title: `New Note`,
      list: req.query.list,
      prev: req.headers.referer,
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  show,
  index,
  create,
  update,
  delete: deleteNote,
  new: newNote,
  edit: editNote,
};
