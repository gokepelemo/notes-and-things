const express = require('express');
const router = express.Router();

const User = require("../models/user");
const Book = require("../models/book");
const List = require("../models/list");
const Defaults = require("../models/defaults")

async function show(req,res,next) {
    let currentlyReading, readingList
    try {
        let user = await User.findById(req.params.id);
        if (user.readingList) readingList = await List.findById(user.readingList)
        if (user.currentlyReading) currentlyReading = await Book.findById(user.readingList)
        res.render('users/show', {title: `Profile Details`, site: Defaults, user: user, book: currentlyReading, list: readingList})
    } catch (err) {
        console.error(err)
    }
}

function index(req,res,next) {
    return
}

function create(req,res,next) {
    return
}

function update(req,res,next) {
    return
}

function deleteUser(req,res,next) {
    return
}

function newUser(req,res,next) {
    return
}

function editUser(req,res,next) {
    return
}

module.exports = {
    show,
    index,
    create,
    update,
    delete: deleteUser,
    new: newUser,
    edit: editUser,
}