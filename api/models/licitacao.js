const mongoose = require('mongoose');

const licitacaoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    municipio: String,
    num_licitacao: String,
    tipo_aviso: String,
    source: String
});

module.exports = mongoose.model('Licitacao', licitacaoSchema);