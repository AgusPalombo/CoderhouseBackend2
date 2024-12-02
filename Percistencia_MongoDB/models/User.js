const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    loginHistory: [{
        timestamp: {
            type: Date,
            default: Date.now
        },
        successful: Boolean
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); 