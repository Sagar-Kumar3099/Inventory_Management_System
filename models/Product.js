const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },

    description: String,

    stock_quantity: {
        type: Number,
        required: true,
        min: 0
    },
    low_stock_threshold: {
         type: Number,
         default: 5
    }
});

module.exports = mongoose.model('Product', productSchema);