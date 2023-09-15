const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Book = require("../models/book");
const List = require("../models/list");
const Defaults = require("../models/defaults");

function index(req, res, next) {
  return;
}

function deleteUser(req, res, next) {
  return;
}

async function show(req, res, next) {
  let currentlyReading, readingList;
  try {
    let user = await User.findById(req.params.id).exec();
    if (user.readingList)
      readingList = await List.findById(user.readingList).exec();
    if (user.currentlyReading)
      currentlyReading = await Book.findById(user.readingList).exec();
    res.render("users/show", {
      title: user.name,
      app: Defaults,
      user: user,
      book: currentlyReading,
      list: readingList,
    });
  } catch (err) {
    console.error(err);
  }
}


async function update(req, res, next) {
  // todo: get details of the logged-in user to confirm that they are an admin 
  // if (req.body.role && req.user.role != "admin") return;
  try {
    let newList,
      user = await User.findById(req.params.id).exec();
    if (!user.readingList) {
      newList = await List.create({
        name: req.body.name,
        photo: req.body.photo ? req.body.photo : `https://placehold.co/100x100`,
        user: req.body.user,
      });
      user.readingList = newList.id;
      await user.save();
    }
    res.redirect(`/profile/${user.id}`);
  } catch (err) {
    console.error(err);
  }
}


async function editUser(req, res, next) {
  try {
    let user = await User.findById(req.params.id).exec();
    res.render(`users/edit`, {
      app: Defaults,
      title: `Edit Profile`,
      user: user,
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
