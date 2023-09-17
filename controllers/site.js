const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const List = require("../models/list");
const Notes = require("../models/note");
const Defaults = require("../models/defaults");

async function home(req, res, next) {
  let lists,
    bookLists = [],
    bookNotes = [];
  try {
    lists = await List.find({}).populate("user").populate("books");
    lists.forEach((item) => {
      item.books.forEach((book) => {
        bookLists[book.id] ? bookLists[book.id]++ : (bookLists[book.id] = 1);
      });
    });
    let notes = await Notes.find({}).populate("book");
    notes.forEach((item) => {
      bookNotes[item.book.id]
        ? bookNotes[item.book.id]++
        : (bookNotes[item.book.id] = 1);
    });
    let books = await Book.find({});
    res.render("index", {
      app: Defaults,
      books: books,
      lists: lists,
      booklists: bookLists,
      booknotes: bookNotes,
      title: `Home`,
    });
  } catch (err) {
    console.error(err);
  }
}

function login(req, res, next) {
  res.render("login", { app: Defaults, title: `Login` });
}

module.exports = {
  home,
  login,
};
