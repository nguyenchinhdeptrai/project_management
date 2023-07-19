
exports.listBook = (req, res) => {
    res.render('book/listbook', {
        layout: 'main'
    })
}
exports.addBook = (req, res) => {
    res.render('book/addbook', {
        layout: 'main'
    })
}
exports.updateBook = (req, res) => {
    res.render('book/updatebook', {
        layout: 'main'
    })
}