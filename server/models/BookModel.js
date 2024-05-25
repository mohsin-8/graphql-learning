const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    name: String,
    genre: String,
    authorId: String
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);