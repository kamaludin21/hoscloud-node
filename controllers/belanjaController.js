const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');   
const Belanja = mongoose.model('Belanja');
const Barang = mongoose.model('Barang');

router.get('/', (req, res) => {
    Belanja.find((err, docs) => {
        if (!err) {
            res.render("belanja/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving employee list :' + err);
        }   
    });
});

router.post('/store', (req, res) => {
    insertBelanja(req, res);
});

router.post('/barang', (req, res) => {
    insertBarang(req, res);
});

router.get('/barang/:id', (req, res) => {

    Belanja.findById(req.params.id, (err, doc) => {
        if(!err) {
            Barang.find({id_belanja: req.params.id}, (err, docs) => {
                res.render('belanja/form', {
                    belanja: doc,
                    barang: docs
                })
            })
        } else {
            console.log('Fail delete at: ' + err);
        }
    });
  
})


function insertBelanja(req, res) {
    let belanja = new Belanja();

    belanja.date = req.body.date;
    belanja.invoices = req.body.invoices;

    belanja.save((err, doc) => {
        if(!err) {
            res.redirect('/belanja/barang/'+doc.id);
        } else {
            console.log('Error: ' + err);
        }
    });
}

function insertBarang(req, res) {

    let barang = new Barang();

    for(let i = 0; i < req.body.id_belanja.length; i++) {
        console.log(i); 
        let multidata = [
            {id_belanja: req.body.id_belanja[i], name: req.body.name[i], jumlah: req.body.jumlah[i]},
            ];
       
        barang.collection.insertMany(multidata, (err, doc) => {
            if(err) {
                console.log('Error: ' + err);
            } 
        });
    }
    res.redirect('/belanja/barang/'+req.body.id_belanja[0]);
}

module.exports = router;