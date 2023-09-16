const express = require("express");
const router = express.Router();

const Defaults = require("../models/defaults");
const Note = require("../models/note");
const Book = require("../models/book");
const Vote = require("../models/vote");

function show(req, res, next) {
  return;
}

function editNote(req, res, next) {
  return;
}

async function index(req, res, next) {
  try {
    let notes = await Note.find({}).populate('user');
    res.render("notes/index", {
      app: Defaults,
      title: `My Notes`,
      note: notes,
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
    let votes = await Vote.find({note: req.params.id });
    for (let i=0;i<votes.length;i++) {
      let voteId = votes[i].id;
      await Vote.findByIdAndDelete(voteId)
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
