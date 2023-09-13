const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List',
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note',
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Vote', voteSchema)