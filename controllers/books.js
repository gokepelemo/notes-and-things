const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const Defaults = require("../models/defaults");

function generateSlug(txt) {
  txt = txt.split(" ");
  txt = txt.length > 4 ? txt.slice(0, 4) : txt;
  return txt.join("-").toLowerCase();
}

async function show(req, res, next) {
  try {
    // todo: this needs not to use a query string. update the function to find out if a slug was generated.
    if (req.query.slug) {
      const book = await Book.findOne({ slug: req.params.id });
      res.render("books/show", {
        site: Defaults,
        title: `Book Details`,
        loggedIn: ``,
        book: book,
      });
    } else {
      const book = await Book.findById(req.params.id);
      res.render("books/show", {
        site: Defaults,
        title: `Book Details`,
        loggedIn: ``,
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
      title: `Home`,
      site: Defaults,
      loggedIn: ``,
      books: books,
    });
  } catch (err) {
    console.error(err);
  }
}

async function create(req, res, next) {
  req.body.slug = generateSlug(req.body.name);
  try {
    const newBook = await Book.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
}

async function update(req, res, next) {
  try {
    let book = await Book.findById(req.params.id);
    if (book.user === req.user.id || req.user.role === "admin") {
      await Book.findByIdAndUpdate(req.params.id, req.body)
      res.redirect(`/books/${book.id}`);
    }
  } catch (err) {
    console.error(err);
  }
  return;
}

async function deleteBook(req, res, next) {
  try {
    let book = await Book.findById(req.params.id);
    if (book.user === req.user.id) {
      await Book.findByIdAndDelete(req.params.id);
      res.redirect("/books");
    }
  } catch (err) {
    console.error(err);
  }
  return;
}

function newBook(req, res, next) {
  res.render("books/new", {
    title: `Add a Book`,
    site: Defaults,
  });
}

async function editBook(req, res, next) {
  try {
    let book = await Book.findById(req.params.id);
    console.log(book)
    res.render("books/edit", {
      title: `Edit a Book`,
      site: Defaults,
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
