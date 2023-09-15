const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const List = require("../models/list");
const Notes = require("../models/note");
const Defaults = require("../models/defaults");

async function home(req, res, next) {
  let lists;
  try {
  if (typeof(req.user) != undefined) {
    lists = await List.find({}).populate('user');
  }
  let books = await Book.find({});
  res.render("index", { app: Defaults, books: books, lists: lists, title: `Home` });
  } catch (err) {
    console.error(err)
  }
}

function login(req,res,next) {
  res.render('login', {app: Defaults, title: `Login`})
}

module.exports = {
  home,
  login
};
