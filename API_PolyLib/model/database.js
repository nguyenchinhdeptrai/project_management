const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority')
    .catch((err) => {
        console.log(err);
    });
module.exports = { mongoose };
