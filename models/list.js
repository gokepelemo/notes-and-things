// const Lists = [
//     {
//         id: 1,
//         name: "Downtown Public Library Book Club",
//         books: [1,2,4],
//     },
//     {
//         id: 2,
//         name: "Northwest Library Book Club",
//         books: [2,3],
//     },
//     {
//         id: 3,
//         name: "South Library Book Club",
//         books: [4,5],
//     },
// ]

// function trending() {
//     return Lists
// }

// function addOne(list) {
//     return
// }

// function updateOne(id,update) {
//     return
// }

// module.exports = {
//     addOne,
//     updateOne,
//     trending: trending()
// }

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: String,
    photo: String,
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('List', listSchema)
