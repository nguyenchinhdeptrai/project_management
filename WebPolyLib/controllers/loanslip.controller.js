
exports.listLoanSlip = (req, res) => {
    res.render('loanslip/listloanslip', {
        layout: 'main'
    })
}
exports.infomationLoanSlip = (req, res) => {
    res.render('loanslip/infomationloanslip', {
        layout: 'main'
    })
}
