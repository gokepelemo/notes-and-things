const express = require("express");
const router = express.Router();

const Defaults = require("../models/defaults");
const Note = require("../models/note");
const Book = require("../models/book");
const Vote = require("../models/vote");
const User = require("../models/user");

async function show(req, res, next) {
  try {
    let noteData = await Note.findById(req.params.id)
      .populate("user")
      .populate("book")
      .populate("list")
      .exec();
    res.render("notes/show", {
      app: Defaults,
      title: `Note from ${noteData.user.name} on ${noteData.book.name}`,
      noteData: noteData,
    });
  } catch (err) {
    console.error(err);
  }
}

async function index(req, res, next) {
  let notes, notesTitle, type, userData;
  try {
    if (req.params.userId) {
      type = `user`;
      notes = await Note.find({ user: req.params.userId })
        .populate("user")
        .populate("list")
        .populate("book");
      userData = await User.findById(req.params.userId);
      notesTitle = `Notes from ${userData.name}`;
    } else if (req.params.listId) {
      type = `list`;
      notes = await Note.find({ list: req.params.listId })
        .populate("user")
        .populate("list")
        .populate("book");
      notesTitle = notes.length > 0 ? `Notes from ${notes[0].list.name}`: `Notes from List`
      console.log(notes)
    } else {
      type = `all`;
      notes = await Note.find({})
        .populate("user")
        .populate("list")
        .populate("book");
      notesTitle = `All Notes`;
    }
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
  delete: deleteNote,
  new: newNote,
};
