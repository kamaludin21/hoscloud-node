const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/market', {useNewUrlParser: true}, (err) => {
    if (!err) {console.log('Database has connected')} else {
        console.log('Error connection : ' + err);
    }
});

require('./products');
require('./belanja');
require('./barang');