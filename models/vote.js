const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note',
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Vote', voteSchema)