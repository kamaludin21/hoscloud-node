const mongoose = require('mongoose');

belanjaSchema = new mongoose.Schema({
    date: {
        type: String
    },
    invoices: {
        type: String
    }
})

mongoose.model('Belanja', belanjaSchema);