
exports.listUser = (req, res) => {
    res.render('user/listuser', {
        layout: 'main'
    })
}
exports.addUser = (req, res) => {
    res.render('user/adduser', {
        layout: 'main'
    })
}
exports.updateUser = (req, res) => {
    res.render('user/updateuser', {
        layout: 'main'
    })
}