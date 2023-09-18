const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Book = require("../models/book");
const List = require("../models/list");
const Vote = require("../models/vote");
const Note = require("../models/note");
const Defaults = require("../models/defaults");
const book = require("../models/book");

function extractId(id) {
  return id.toString().replace('new ObjectId("', "").replace('")', "");
}

function index(req, res, next) {
  return;
}

function deleteUser(req, res, next) {
  return;
}

async function show(req, res, next) {
  let readingList = [],
    vote = [];
  try {
    let userData = await User.findById(req.params.id)
      .populate("reading")
      .exec();
    let noteData = await Note.find({ list: extractId(userData.readingList) })
      .populate("book")
      .exec();
    if (userData.readingList) {
      readingList = await List.findById(userData.readingList)
        .populate("books")
        .populate("booksRead")
        .populate("user")
        .exec();
      for (let i = 0; i < readingList.books.length; i++) {
        vote = vote.concat(
          await Vote.find({
            book: readingList.books[i].id,
            list: extractId(userData.readingList),
          })
            .populate("book")
            .populate("note")
            .exec()
        );
      }
    }
    res.render("users/show", {
      title: userData.name,
      app: Defaults,
      userData: userData,
      list: readingList,
      vote: vote,
      note: noteData,
    });
  } catch (err) {
    console.error(err);
  }
}

async function update(req, res, next) {
  if (req.body.role && req.user.role != "admin") return;
  try {
    let newList,
      userData = await User.findById(req.params.id).exec();
    // a user should have a reading list by default. if they don't have one, create one.
    if (!userData.readingList) {
      newList = await List.create({
        name: `${req.body.name}'s Reading List`,
        photo: req.body.photo ? req.body.photo : `https://placehold.co/100x100`,
        user: req.body.user,
        personal: true,
      });
      userData.readingList = newList.id;
    }
    // validation of the form data so that we don't make an existing attribute undefined
    if (req.body.name) userData.name = req.body.name;
    if (req.body.email) userData.email = req.body.email;
    if (req.body.photo) userData.photo = req.body.photo;
    if (req.body.role) userData.role = req.body.role;
    if (req.body.reading) userData.reading = req.body.reading;
    if (req.body.readingProgress) userData.readingProgress = req.body.readingProgress;
    await userData.save();
    res.redirect(`/profile/${userData.id}`);
  } catch (err) {
    console.error(err);
  }
}

async function editUser(req, res, next) {
  try {
    let userData = await User.findById(req.params.id)
      .populate("reading")
      .exec();
    let book = await Book.find({});
    let readingList = await List.findById(userData.readingList).populate("books");
    res.render(`users/edit`, {
      app: Defaults,
      title: `Edit Profile`,
      userData: userData,
      book: book,
      readingList: readingList,
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  show,
  index,
  update,
  delete: deleteUser,
  edit: editUser,
};
