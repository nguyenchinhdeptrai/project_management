const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const alert = require('alert');
const mongoose = require('mongoose');
const handlebarsHelpers = require('./handlebars-helpers')
const md = require('./model/modelloandeltail'); //
const mdUser = require('./model/modeluser');
const mdMember = require('./model/modelmember');

const app = express();

const port = 3000;

const uri = 'mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority';
mongoose.connect(uri);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/js', express.static('js'));
app.use('/images', express.static('images'));
app.use('/uploads', express.static('uploads'));

app.engine('.hbs', expressHbs.engine({ extname: 'hbs', defaultLayout: 'login', layoutsDir: 'views/', helpers: handlebarsHelpers.helpers }));

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
const routerApiUser = require('./router/routerAPI/user.router');
app.use('/api', routerApiUser);
const routerApiMember = require('./router/routerAPI/member.router');
app.use('/api', routerApiMember);
const routerApiLoanDeltail = require('./router/routerAPI/loandeltial.router');
app.use('/api', routerApiLoanDeltail);
//login
const routerApiLogin = require('./router/routerAPI/login.router');
app.use('/api', routerApiLogin);
//search
const routerApiSearch = require('./router/routerAPI/search.router');
app.use('/api', routerApiSearch);

app.get('/', (req, res) => {
    res.redirect('/login');
})

app.get('/login', (req, res) => {
    res.render('login', {
        layout: "mainAuth",

    });
})


app.post('/login', async (req, res) => {
    let arrUser = await mdUser.find();
    const { userName, password } = req.body;
    let foundUser = false;
    arrUser.forEach(element => {
        if (userName == element.phone && password == element.password) {
            foundUser = true;
            if (element.status == "Admin") {
                setTimeout(() => {
                    return res.send('<script>alert("Đăng nhập thành công."); window.location="/home";</script>');
                }, 2000);

            } else {
                return res.send('<script>alert("Tài khoản này không có quyền truy cập."); window.location="/login";</script>');
            }
        }
    });
    if (!foundUser) {
        return res.send('<script>alert("Không đúng tài khoản mật khẩu."); window.location="/login";</script>');
    }
});
app.get('/home', async (req, res) => {
    try {
        const dataMonth = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

        // Lấy danh sách các bản ghi từ cơ sở dữ liệu
        const data = await md.find().lean();

        // Tính tổng price và lượt mượn theo từng tháng
        const totalPriceByMonth = {};
        const totalLoansByMonth = {}; //Lượt mượn trong tháng

        // Khởi tạo các khóa cho các tháng trong totalPriceByMonth và totalLoansByMonth
        // Mục đích của việc này là đảm bảo rằng tất cả các tháng 
        // có giá trị ban đầu là 0 trong hai đối tượng trước khi 
        // chúng ta bắt đầu tính tổng doanh thu và số lượt mượn thực 
        // tế từ dữ liệu. 
        dataMonth.forEach((monthName, index) => {
            totalPriceByMonth[monthName] = 0;
            totalLoansByMonth[monthName] = 0;
        });

        data.forEach(item => {
            const [day, month, year] = item.endDate.split('/');
            //month khi chuyển về INT sẽ là số phải - 1 để bằng với index trong mảng
            const monthName = dataMonth[parseInt(month) - 1];

            totalPriceByMonth[monthName] += item.price;
            totalLoansByMonth[monthName]++;
        });
        // Chuyển dữ liệu sang mảng để truyền cho Handlebars
        const totalPriceData = dataMonth.map(monthName => ({
            month: monthName,
            totalPrice: totalPriceByMonth[monthName] || 0,
        }))

        const totalLoansData = dataMonth.map(monthName => ({
            month: monthName,
            totalLoans: totalLoansByMonth[monthName] || 0,
        }));
        //C2: dùng cũng được
        // const totalPriceData = Object.keys(totalPriceByMonth).map(key => ({
        //     month: key,
        //     totalPrice: totalPriceByMonth[key] || 0,
        // }));

        const dataMember = await mdMember.find().lean();
        const dataUser = await mdUser.find().lean();

        let totalPrice = 0;
        let totalLoan = data.length;
        let totalMember = dataMember.length;
        let totalUser = dataUser.length;

        data.forEach(element => {
            totalPrice += element.price;
         
        });
        let totalPriceString = totalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}).replace("₫", "");
        res.render('home', {
            layout: "main",
            totalPriceData,
            totalLoansData,
            dataMonth,
            totalPriceString,
            totalLoan,
            totalMember,
            totalUser
        });
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu:', error);
        res.status(500).send('Đã xảy ra lỗi khi lấy dữ liệu.');
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});