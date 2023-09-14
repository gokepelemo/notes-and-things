const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
    },
    reading: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    readingProgress: {
        type: Number,
    },
    readingList: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema)
