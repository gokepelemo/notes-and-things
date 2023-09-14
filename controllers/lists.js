const express = require('express');
const router = express.Router();

const List = require('../models/list');
const Defaults = require('../models/defaults')

async function show(req,res,next) {
    try {
        let list = await List.findById(req.params.id);
        res.render('lists/show', {site: Defaults, title: `List Details`, list: list})
    } catch (err) {
        console.error(err);
    }
}

async function index(req,res,next) {
    try {
        let list = await List.find({});
        res.render('lists/index', {site: Defaults, title: `All Lists`, list: list})
    } catch (err) {
        console.error(err)
    }
}

async function create(req,res,next) {
    try {
        let list = await List.create(req.body);
        res.redirect(`/lists/${list.id}`)
    } catch (err) {
        console.error(err)
    }
}

async function update(req,res,next) {
    if (!req.user) return;
    try {
        let list = await List.findById(req.params.id);
        if (list.user === req.user.id) {
            await List.findByIdAndUpdate(req.params.id,req.body)
            res.redirect(`/lists/${list.id}`)
        }
    } catch (err) {
        console.error(err)
    }
}

async function deleteList(req,res,next) {
    try {
        await List.findByIdAndDelete(req.params.id);
        res.redirect('/lists')
    } catch (err) {
        console.error(err)
    }
}

function newList(req,res,next) {
    res.render('lists/new', {site: Defaults, title: `New List`})
}

function editList(req,res,next) {
    res.render('lists/edit', {site: Defaults, title: `Edit List`})
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