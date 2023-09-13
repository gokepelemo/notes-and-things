// const Books = [
//     {
//         id: 1,
//         name: "The Hard Thing About Hard Things",
//         author: "Ben Horowitz",
//         photo: "https://m.media-amazon.com/images/I/51ZuUYAopiL._SY445_SX342_.jpg",
//         isbn: ``,
//         addedBy: ``
//     },
//     {
//         id: 2,
//         name: "Inspired",
//         author: "Marty Cagan",
//         photo: "https://m.media-amazon.com/images/I/41Gc1klZ0DL._SY445_SX342_.jpg",
//         isbn: ``,
//         addedBy: ``
//     },
//     {
//         id: 3,
//         name: "Good to Great",
//         author: "Jim Collins",
//         photo: "https://m.media-amazon.com/images/I/513OnP4AwTL._SY445_SX342_.jpg",
//         isbn: ``,
//         addedBy: ``
//     },
//     {
//         id: 4,
//         name: "Zero to One",
//         author: "Peter Thiel",
//         photo: "https://m.media-amazon.com/images/I/41PZRSHF-NL._SY445_SX342_.jpg",
//         isbn: ``,
//         addedBy: ``
//     },
//     {
//         id: 5,
//         name: "Delivering Happiness",
//         author: "Tony Hsieh",
//         photo: "https://m.media-amazon.com/images/I/51vNDc50J3L._SY445_SX342_.jpg",
//         isbn: ``,
//         addedBy: ``
//     }
// ]

// function trending() {
//     return Books
// }

// module.exports = {
//     trending: trending()
// }

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    author: String,
    photo: String,
    isbn: String,
    votes: [{
        type: Schema.Types.ObjectId,
        ref: 'Vote',
        required: true,
    }],
    user: String,
    slug: String,
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema)
