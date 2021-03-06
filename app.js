const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const licitacaoRoutes = require('./api/routes/licitacoes');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect("mongodb+srv://admin:" +
    process.env.MONGO_ATLAS_PW + "@cluster0.tnm7o.mongodb.net/licitacao?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    //Call next to free the access to tjhe other routes
    next();
});

app.use('/licitacoes', licitacaoRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// caso a requisição chege até essa linha, significa que nenhuma das funções acima conseguiu trata-la
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;