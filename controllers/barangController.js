const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');   
const Barang = mongoose.model('Barang');

router.post('/store', (req, res) => {
    insertBarang(req, res);
});

router.get('/delete/:id', (req, res) => {
    Barang.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.redirect('/belanja/barang/'+doc.id_belanja);
        } else {
            console.log('Fail delete at: ' + err);
        }
    });
});

function insertBarang(req, res) {
    let barang = new Barang();

    barang.id_belanja = req.body.id_belanja;
    barang.name = req.body.name;
    barang.jumlah = req.body.jumlah;

    barang.save((err, doc) => {
        if(!err) {
            res.redirect('http://127.0.0.1:8000/belanja/barang/'+barang.id_belanja);
        } else {
            console.log('Error: ' + err);
        }
    });
}

module.exports = router;