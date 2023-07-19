
exports.listType = (req, res) => {
    res.render('typebook/listtypebook', {
        layout: 'main'
    })
}
exports.addType = (req, res) => {
    res.render('typebook/addtype', {
        layout: 'main'
    })
}
exports.updateType = (req, res) => {
    res.render('typebook/updatetype', {
        layout: 'main'
    })
}