const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: {
        type: String,
    },
    photo: {
        type: String,
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
    }],
    booksRead: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    personal: {
        type: Boolean,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('List', listSchema)
