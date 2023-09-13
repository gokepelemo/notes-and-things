// const Users = [
//     {
//         id: 1,
//         name: "John Doe",
//         reading: [{book: 2, progress: Math.ceil(Math.random()*100)}],
//         photo: "https://i.pravatar.cc/100",
//         googleId: ``,
//     },
//     {
//         id: 2,
//         name: "Denzel Washington",
//         reading: [{book: 3, progress: Math.ceil(Math.random()*100)}],
//         photo: "https://i.pravatar.cc/100",
//         googleId: ``,
//     },
//     {
//         id: 3,
//         name: "Tom Hanks",
//         reading: [{book: 1, progress: Math.ceil(Math.random()*100)}],
//         photo: "https://i.pravatar.cc/100",
//         googleId: ``,
//     },
//     {
//         id: 4,
//         name: "Tom Cruise",
//         reading: [{book: 4, progress: Math.ceil(Math.random()*100)}],
//         photo: "https://i.pravatar.cc/100",
//         googleId: ``,
//     },
//     {
//         id: 5,
//         name: "Johnny Depp",
//         reading: [{book: 4, progress: Math.ceil(Math.random()*100)}],
//         photo: "https://i.pravatar.cc/100",
//         googleId: ``,
//     }
// ]

// function getAll() {
//     return Users
// }
// function findOne() {
//     return Users[Math.ceil(Math.random()*Users.length-1)]
// }

// function addOne(user) {
//     Users.push({id: Users.length, name: user ? user : "Test User", reading: [{book: 2, progress: Math.floor(Math.random()*100)}], photo: "https://i.pravatar.cc/100",})
// }

// module.exports = {
//     getAll,
//     findOne,
//     addOne
// }

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        required: true,
    },
    email: String,
    photo: String,
    role: String,
    reading: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)
