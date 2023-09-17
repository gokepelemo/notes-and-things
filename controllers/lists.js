const express = require("express");
const router = express.Router();

const List = require("../models/list");
const Book = require("../models/book");
const Vote = require("../models/vote");
const Note = require("../models/note");
const User = require("../models/user");
const Defaults = require("../models/defaults");

function extractId(id) {
  return id.toString().replace('new ObjectId("', "").replace('")', "");
}

async function show(req, res, next) {
  try {
    let list = await List.findById(req.params.id)
      .populate("books")
      .populate("user")
      .populate("booksRead");
    if (list.personal) {
      res.redirect(`/profile/${list.user.id}`);
      return;
    }
    let vote = await Vote.find({ list: list.id }).populate("book");
    let note = await Note.find({ list: list.id }).populate("book");
    res.render("lists/show", {
      app: Defaults,
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
    let list = await List.find({}).populate('user');
    res.render("lists/index", {
      app: Defaults,
      title: `My Lists`,
      list: list,
    });
  } catch (err) {
    console.error(err);
  }
}

async function create(req, res, next) {
  try {
    let list = await List.create(req.body);
    res.redirect(`/lists/${list.id}/edit`);
  } catch (err) {
    console.error(err);
  }
}

async function update(req, res, next) {
  let list = await List.findById(req.params.id);
  if (req.body.name) list.name = req.body.name;
  if (req.body.photo) list.photo = req.body.photo;
  if (req.body.books) {
    let mappedList = list.books.map((item) => extractId(item));
    if (mappedList.indexOf(req.body.books) === -1) {
      list.books.push(req.body.books);
    }
  }
  if (req.body.booksRead) {
    let mappedList = list.booksRead.map((item) => extractId(item));
    if (mappedList.indexOf(req.body.booksRead) === -1) {
      list.booksRead.push(req.body.booksRead);
    } else {
      list.booksRead.splice(mappedList.indexOf(req.body.booksRead), 1);
    }
  }
  try {
    await list.save();
    res.redirect(`/lists/${list.id}`);
  } catch (err) {
    console.error(err);
  }
}

async function removeBook(req, res, next) {
  let list = await List.findById(req.params.id);
  let mappedList = list.books.map((item) => extractId(item));
  if (mappedList.indexOf(req.body.book) === -1) {
    return;
  } else {
    list.books.splice(mappedList.indexOf(req.body.book), 1);
  }
  try {
    await list.save();
    res.redirect(`/lists/${list.id}`);
  } catch (err) {
    console.error(err);
  }
}

async function deleteList(req, res, next) {
  try {
    let user = await User.find({ readingList: req.params.id }).exec();
    if (user[0]) {
      user = await User.findById(user[0].id);
      user.readingList = undefined;
      user.save();
    }
    await List.findByIdAndDelete(req.params.id);
    res.redirect("/lists");
  } catch (err) {
    console.error(err);
  }
}

function newList(req, res, next) {
  res.render("lists/new", { app: Defaults, title: `New List` });
}

async function editList(req, res, next) {
  try {
    let list = await List.findById(req.params.id).populate("books");
    let books = await Book.find({});
    res.render("lists/edit", {
      app: Defaults,
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
  removeBook,
};
