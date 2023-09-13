const express = require('express');
const router = express.Router();

function show(req,res,next) {
    return
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

function deleteNote(req,res,next) {
    return
}

function newNote(req,res,next) {
    return
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