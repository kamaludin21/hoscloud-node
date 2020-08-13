require('./models/database');

const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const productsController = require('./controllers/productsController');
const belanjaController = require('./controllers/belanjaController');
const barangController = require('./controllers/barangController');
const { readdir } = require('fs');

let app = express();

app.use(bodyparser.urlencoded({
    extended: true,
}));

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'hbs');

app.listen(8000, () => {
    console.log('Started at 127.0.0.1:8000');
});

app.use('/products', productsController);
app.use('/belanja', belanjaController);
app.use('/barang', barangController);
