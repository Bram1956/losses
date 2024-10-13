const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    customer: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);