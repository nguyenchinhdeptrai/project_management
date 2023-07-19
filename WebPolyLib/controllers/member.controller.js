
exports.listMember = (req, res) => {
    res.render('member/listMember', {
        layout: 'main'
    })
}
exports.add = (req, res) => {
    res.render('member/addmember', {
        layout: 'main'
    })
}
exports.update = (req, res) => {
    res.render('member/updatemember', {
        layout: 'main'
    })
}