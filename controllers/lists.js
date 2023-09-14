const express = require("express");
const router = express.Router();

const List = require("../models/list");
const Book = require("../models/book");
const Vote = require("../models/vote");
const Note = require("../models/note");
const Defaults = require("../models/defaults");

async function show(req, res, next) {
  try {
    let list = await List.findById(req.params.id).populate('books');
    let vote = await Vote.find({list: list.id}).populate('book');
    let note = await Note.find({list: list.id}).populate('book');
    res.render("lists/show", {
      site: Defaults,
      title: list.name,
      list: list,
      vote: vote,
      note: note,
    });
  } catch (err) {
    console.error(err);
  }
}

async function index(req, res, next) {
  try {
    let list = await List.find({});
    res.render("lists/index", {
      site: Defaults,
      title: `All Lists`,
      list: list,
    });
  } catch (err) {
    console.error(err);
  }
}

async function create(req, res, next) {
  try {
    let list = await List.create(req.body);
    res.redirect(`/lists/${list.id}`);
  } catch (err) {
    console.error(err);
  }
}

async function update(req, res, next) {
  let list = await List.findById(req.params.id);
  list.name = req.body.name;
  list.photo = req.body.photo;
  list.books.push(req.body.books);
  try {
    await list.save();
    res.redirect(`/lists/${list.id}`);
  } catch (err) {
    console.error(err);
  }
}

async function deleteList(req, res, next) {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.redirect("/lists");
  } catch (err) {
    console.error(err);
  }
}

function newList(req, res, next) {
  res.render("lists/new", { site: Defaults, title: `New List` });
}

async function editList(req, res, next) {
  try {
    let list = await List.findById(req.params.id).populate('books');
    let books = await Book.find({});
    res.render("lists/edit", {
      site: Defaults,
      title: `Edit ${list.name}`,
      list: list,
      books: books,
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
  delete: deleteList,
  new: newList,
  edit: editList,
};
