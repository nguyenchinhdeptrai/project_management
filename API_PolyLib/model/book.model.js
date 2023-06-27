const db = require('./database');

const bookSchema = new db.mongoose.Schema({
        bookName: String,
        bookAuthor: String,
        releaseYear: Number,
        itemQuantity: Number,
});

const Book = db.mongoose.model('book', bookSchema);

module.exports = Book;