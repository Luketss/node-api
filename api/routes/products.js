const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

//get method will handle income get requests router.get('url', )
// by using only slash in the get, we already use the route /Name_file
router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err)); //provided by mongoose to save in db
    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc)
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry'
                })
            }
        })
        .catch(err => console.log(err));
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.id;
    Product.remove({
        _id: id
    })
});

module.exports = router;