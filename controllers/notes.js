const express = require("express");
const router = express.Router();

const Defaults = require("../models/defaults");
const Note = require("../models/note");
const Book = require("../models/book");

function show(req, res, next) {
  return;
}

async function index(req, res, next) {
  try {
    let notes = await Note.find({});
    res.render("notes/index", {
      site: Defaults,
      title: `All Notes`,
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
    res.redirect("/notes");
  } catch (err) {
    console.error(err);
  }
}

async function newNote(req, res, next) {
  try {
    let book = await Book.findById(req.params.id);
    res.render("notes/new", {
      site: Defaults,
      book: book,
      title: `New Note`,
      list: req.query.list,
    });
  } catch (err) {
    console.error(err);
  }
}

function editNote(req, res, next) {
  return;
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
