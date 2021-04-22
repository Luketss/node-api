const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Licitacao = require('../models/licitacao');

//get method will handle income get requests router.get('url', )
// by using only slash in the get, we already use the route /Name_file
router.get('/', (req, res, next) => {
    Licitacao.find()
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
    const licitacao = new Licitacao({
        _id: new mongoose.Types.ObjectId(),
        municipio: req.body.municipio,
        num_licitacao: req.body.num_licitacao,
        tipo_aviso: req.body.tipo_aviso,
        source: req.body.source
    });
    licitacao.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err)); //provided by mongoose to save in db
    res.status(201).json({
        message: 'Handling POST requests to /products',
        created: licitacao
    });
});

router.get('/:licitacaoId', (req, res, next) => {
    const id = req.params.licitacaoId;
    Licitacao.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc)
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'Not found',
                    id: id
                })
            }
        })
        .catch(err => console.log(err));
});

router.patch('/:licitacaoId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    })

});

router.delete('/:licitacaoId', (req, res, next) => {
    const id = req.params.licitacaoId;
    Licitacao.remove({
            _id: id
        })
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

module.exports = router;