// handlebars-helpers.js
const Handlebars = require('handlebars');

// Định nghĩa custom helper JSONstringify
Handlebars.registerHelper('JSONstringify', function (context) {
    return JSON.stringify(context);
});

module.exports = {
    helpers: Handlebars.helpers, // Xuất các custom helper đã đăng ký
};
