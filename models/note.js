const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Note', noteSchema)
