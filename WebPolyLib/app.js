const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
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
    res.render('login', {
        layout: "main",
    });
})
//post
app.post('/auth/login', (req, res) => {
    res.render('home', {
        layout:"main",
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});