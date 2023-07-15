const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const alert = require('alert');
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/images', express.static('images'));

app.engine('.hbs', expressHbs.engine({ extname: 'hbs', defaultLayout: 'login', layoutsDir: 'views/' }));

app.set('view engine', '.hbs');
app.set('views', './views/layouts');
//router
const routerMember = require('./router/member');
app.use('/',routerMember);

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