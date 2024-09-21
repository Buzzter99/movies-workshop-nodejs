const {engine} = require('express-handlebars');
const path = require('path');

function hbsConfig(app) {
    app.engine('hbs', engine({
        extname: 'hbs', 
        defaultLayout: false
    }));
    app.set('view engine', 'hbs');
    app.set('views', 'views');
}

module.exports = {hbsConfig}