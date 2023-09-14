const express = require('express');
const router = express.Router();

const Defaults = require('../models/defaults');
const Note = require('../models/note')

function show(req,res,next) {
    return
}

async function index(req,res,next) {
    try {
        let notes = await Note.find({});
        res.render('notes/index', {site: Defaults, title: `All Notes`, note: notes})
    } catch (err) {
        console.error(err);
    }
}

async function create(req,res,next) {
    try {
        let newNote = await Note.create(req.body);
        res.redirect(`/books/${get.params.id}`)
    } catch (err) {
        console.error(err)
    }
}

function update(req,res,next) {
    return
}

function deleteNote(req,res,next) {
    return
}

function newNote(req,res,next) {
    res.render('notes/new', {site: Defaults})
}

function editNote(req,res,next) {
    return
}

module.exports = {
    show,
    index,
    create,
    update,
    delete: deleteNote,
    new: newNote,
    edit: editNote,
}