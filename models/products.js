const mongoose = require('mongoose');

productsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    stock: {
        type: Number
    }
});

mongoose.model('Products', productsSchema)