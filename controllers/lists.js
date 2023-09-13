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

function deleteList(req,res,next) {
    return
}

function newList(req,res,next) {
    return
}

function editList(req,res,next) {
    return
}

module.exports = {
    show,
    index,
    create,
    update,
    delete: deleteList,
    new: newList,
    edit: editList,
}