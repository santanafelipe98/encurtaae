const mongoose = require('mongoose');

const ShortURLSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    originalURL: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expireAt: {
        type: Date,
        required: true,
        expires: 0
    }
}, { _id: false });

const ShortURL = mongoose.models.ShortURL || mongoose.model('ShortURL', ShortURLSchema);

module.exports = () => {
    return ShortURL;
};