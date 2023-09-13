const express = require('express');
const router = express.Router();

const User = require("../models/user")
const Defaults = require("../models/defaults")

async function show(req,res,next) {
    try {
        let user = await User.findById(req.params.id);
        res.render('users/show', {title: `Profile Details`, site: Defaults, user: user})
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