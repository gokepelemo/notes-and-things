const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Book = require("../models/book");
const List = require("../models/list");
const Vote = require("../models/vote");
const Note = require("../models/note");
const Defaults = require("../models/defaults");

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
  let readingList,
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
    if (!userData.readingList) {
      newList = await List.create({
        name: `${req.body.name}'s Reading List`,
        photo: req.body.photo ? req.body.photo : `https://placehold.co/100x100`,
        user: req.body.user,
        personal: true,
      });
      userData.readingList = newList.id;
    }
    userData.name = req.body.name;
    userData.email = req.body.email;
    userData.photo = req.body.photo;
    if (req.body.role) {
      userData.role = req.body.role;
    } else {
      userData.role = "member";
    }
    userData.reading = req.body.reading;
    userData.readingProgress = req.body.readingProgress;
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
    res.render(`users/edit`, {
      app: Defaults,
      title: `Edit Profile`,
      userData: userData,
      book: book,
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
