// todo: improve error handling
const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const Vote = require("../models/vote");
const Note = require("../models/note");
const List = require("../models/list");
const Defaults = require("../models/defaults");

function generateSlug(txt) {
  txt = txt.toLowerCase().replace(/[!@#$%^&*()_+:]/g, "").split(" ");
  const articles = ["a", "an", "the", "of"];
  articles.forEach((item) => {
    if (txt.indexOf(item) !== -1) txt.splice(txt.indexOf(item), 1);
  });
  txt = txt.length > 4 ? txt.slice(0, 4) : txt;
  return txt.join("-");
}

async function show(req, res, next) {
  try {
    let book = (await Book.findOne({ slug: req.params.id }))
      ? await Book.findOne({ slug: req.params.id })
      : await Book.findById(req.params.id);
    let note = await Note.find({ book: book.id })
      .populate("user")
      .populate("list");
    let vote = await Vote.find({ note }).populate('note');
    if (book.slug) {
      res.set({
        Link: `<${req.protocol}://${req.headers.host}/books/${book.id}>; rel="canonical"`,
      });
      res.render("books/show", {
        app: Defaults,
        title: book.name,
        book: book,
        note: note,
        vote: vote,
      });
    } else {
      res.render("books/show", {
        app: Defaults,
        title: book.name,
        book: book,
      });
    }
  } catch (err) {
    console.error(err);
  }
}

async function index(req, res, next) {
  try {
    const books = await Book.find({});
    res.render("books/index", {
      title: `All Books`,
      app: Defaults,
      books: books,
    });
  } catch (err) {
    console.error(err);
  }
}

async function create(req, res, next) {
  req.body.slug = generateSlug(req.body.name);
  if (await Book.findOne({ slug: req.body.slug }))
    req.body.slug += `-${Math.ceil(Math.random() * 50)}`;
  try {
    const newBook = await Book.create(req.body);
    res.redirect(`/books/${newBook.slug}`);
  } catch (err) {
    console.error(err);
  }
}

async function update(req, res, next) {
  try {
    let book = await Book.findById(req.params.id);
    if (req.user.role === "admin") {
      await Book.findByIdAndUpdate(req.params.id, req.body);
      res.redirect(`/books/${book.id}`);
    }
  } catch (err) {
    console.error(err);
  }
  return;
}

async function deleteBook(req, res, next) {
  try {
    if (req.user.role === "admin") {
      let votes = await Vote.find({ book: req.params.id });
      let notes = await Note.find({ book: req.params.id });
      for (let i = 0; i < votes.length; i++) {
        let voteId = votes[i].id;
        await Vote.findByIdAndDelete(voteId);
      }
      for (let i = 0; i < notes.length; i++) {
        let noteId = notes[i].id;
        await Note.findByIdAndDelete(noteId);
      }
      await Book.findByIdAndDelete(req.params.id);
      res.redirect("/books");
    }
  } catch (err) {
    console.error(err);
  }
}

function newBook(req, res, next) {
  res.render("books/new", {
    title: `Add a Book`,
    app: Defaults,
  });
}

async function editBook(req, res, next) {
  try {
    let book = await Book.findById(req.params.id);
    res.render("books/edit", {
      title: `Edit ${book.name}`,
      app: Defaults,
      book: book,
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
  delete: deleteBook,
  new: newBook,
  edit: editBook,
};
