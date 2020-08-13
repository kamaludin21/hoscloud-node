const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Products = mongoose.model('Products');    

router.get('/', (req, res) => {
    Products.find((err, docs) => {
        if (!err) {
            res.render("products/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving employee list :' + err);
        }   
    });
});

router.get('/apis/', (req, res) => {
    Products.find((err, docs) => {
        if (!err) {
            res.json(docs);
        }  
    });
});

router.get('/form', (req, res) => {
    res.render('products/form');
});

router.post('/store', (req, res) => {
    insertData(req, res);
});

router.post('/update', (req, res) => {
    updateData(req, res);
});

router.get('/:id', (req, res) => {
    Products.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render('products/edit', {
                product: doc
            });
        }
    });
})

router.get('/delete/:id', (req, res) => {
    Products.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.redirect('/products');
        } else {
            console.log('Fail delete at: ' + err);
        }
    });
});

function insertData(req, res) {
    let product = new Products();

    product.name = req.body.name;
    product.stock = req.body.stock; 

    product.save((err, doc) => {
        if(!err) {
            res.redirect('/products');
        } else {
            console.log('Error: ' + err);
        }
    });
}

function updateData(req, res) {
    Products.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/products'); } else {
        console.log('Error during record update : ' + err);
        }
    });
}

module.exports = router;