const db = require('./database');

const kindOfBookSchema = new db.mongoose.Schema({
    bookName: String,
});

const KindBook = db.mongoose.model('kind-of-book', kindOfBookSchema);

module.exports = KindBook;