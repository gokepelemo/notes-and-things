// const Notes = [
//     {
//         id: 1,
//         title: "Lorem Ipsum",
//         content: "Cum doloremque adipisci sit maxime eveniet et inventore aliquam 33 quod internos non mollitia voluptas ad odio veritatis. Quo necessitatibus rerum At ducimus error et facere officiis.",
//         book: 1,
//         list: 1,
//     },
//     {
//         id: 2,
//         title: "Qui dolor optio vel aliquam",
//         content: "Itaque est velit recusandae ad incidunt saepe sed sunt repellendus est delectus blanditiis. Ut animi sunt in maxime illo quo vero repudiandae ea omnis rerum eum quaerat voluptatum.",
//         book: 2,
//         list: 1,
//     },
//     {
//         id: 3,
//         title: "In excepturi dolorum vel",
//         content: "Repudiandae ducimus eos pariatur magni eum unde voluptas aut nulla dolores. A nesciunt nulla aut quidem possimus non quas modi id nihil quas ex perspiciatis quia eos obcaecati molestias et consectetur voluptatibus.",
//         book: 4,
//         list: 1,
//     },
//     {
//         id: 4,
//         title: "Non quaerat quos aut tempora",
//         content: "Natus ut enim deleniti. Est architecto quas ad veritatis asperiores et rerum omnis. Aut dolores libero et inventore dignissimos et impedit tempore hic eaque molestias.",
//         book: 4,
//         list: 1,
//     },
//     {
//         id: 5,
//         title: "Ut expedita sunt sit sequi ",
//         content: "Repellendus ea harum porro ut eaque consequatur ad possimus nobis est omnis internos. Et voluptatibus omnis ea nihil aperiam non blanditiis error eos similique recusandae et incidunt voluptatem. A deleniti minus id inventore minima qui ducimus voluptatibus. Et voluptatem harum et voluptatem dicta non molestiae voluptas et corrupti magni qui vitae doloribus sit placeat quia et praesentium sequi.",
//         book: 4,
//         list: 1,
//     }
// ]

// function trending() {
//     return Notes
// }

// module.exports = {
//     trending: trending()
// }

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    name: String,
    title: String,
    content: String,
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    // notes can be added in the context of a list, but this isn't required
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema)
