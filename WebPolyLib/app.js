const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const alert = require('alert');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/js', express.static('js'));
app.use('/images', express.static('images'));

app.engine('.hbs', expressHbs.engine({ extname: 'hbs', defaultLayout: 'login', layoutsDir: 'views/' }));

app.set('view engine', '.hbs');
app.set('views', './views/layouts');
//router
const routerMember = require('./router/member.route');
app.use('/', routerMember);
//book
const routerBook = require('./router/book.router');
app.use('/', routerBook);
//typebook
const routerTypebook = require('./router/typebook.router');
app.use('/', routerTypebook)
//user
const routerUser = require('./router/user.router');
app.use('/', routerUser);
const routerLoanSlip = require('./router/loanslip.router');
app.use('/', routerLoanSlip);

// api
const routerApiBook = require('./router/routerAPI/book.router');
app.use('/api', routerApiBook);
const routerApiTypeBook = require('./router/routerAPI/typebook.router');
app.use('/api', routerApiTypeBook);

app.get('/', (req, res) => {
    res.redirect('/home');
})

app.get('/login', (req, res) => {
    res.render('login', {
        layout: "main",
    });
})


app.post('/login', (req, res) => {
    const { userName, password } = req.body;
    if (userName == 'admin' && password == 'admin') {
        alert('Đăng nhập thành công')

        setTimeout(() => {
            res.redirect('/home');
        }, 2000);

    } else {
        alert('Không đúng tài khoản mật khẩu')
        res.redirect('/login');
    }
});
app.get('/home', (req, res) => {
    res.render('home', {
        layout: "main",
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});