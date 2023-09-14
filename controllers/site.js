const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const List = require("../models/list");
const Notes = require("../models/note");
const Defaults = require("../models/defaults");

async function home(req, res, next) {
  let books = await Book.find({});
  res.render("index", { site: Defaults, books: books, title: `Home` });
}

module.exports = {
  home,
};
