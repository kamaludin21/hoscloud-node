const mongoose = require('mongoose');

barangSchema = new mongoose.Schema({
    id_belanja: {
        type: String
    },
    name: {
        type: String
    },
    jumlah: {
        type: Number
    }
});

mongoose.model('Barang', barangSchema);