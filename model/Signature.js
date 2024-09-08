const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const SignatureSchema = new Schema({
    documentId:{type: String, required: true},
    signature:{type: String, required: true},
    CreatedAt:{type: Date, default: Date.now}
});

module.exports = mongoose.model('Signature', SignatureSchema);