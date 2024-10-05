const {engine} = require('express-handlebars');
const { register } = require('module');
const path = require('path');

function hbsConfig(app) {
    app.engine('hbs', engine({
        extname: 'hbs', 
        defaultLayout: false,
        partialsDir: path.join(__dirname, 'views/partials'),
    }));
    app.set('view engine', 'hbs');
    app.set('views', 'views');
}

module.exports = {hbsConfig}