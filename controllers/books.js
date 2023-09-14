const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const Defaults = require("../models/defaults");

function generateSlug(txt) {
  txt = txt.toLowerCase().split(" ");
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
    if (book.slug) {
      res.set({
        Link: `<${req.protocol}://${req.headers.host}/books/${book.id}>; rel="canonical"`,
      });
      res.render("books/show", {
        site: Defaults,
        title: `Book Details`,
        loggedIn: ``,
        book: book,
      });
    } else {
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
  console.log(req.user)
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
      let book = await Book.findById(req.params.id);
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
