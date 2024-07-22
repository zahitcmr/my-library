const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: {type: String},
    author: {type: String},
    year: {type: Number},
    pageNumber: {type: Number},
    isbnNumber: {type: Number},
    createdUser: {type: Schema.Types.ObjectId, ref: "User", required: true},
}, {
    timestamps: true,
});

module.exports = mongoose.model("Book",BookSchema)