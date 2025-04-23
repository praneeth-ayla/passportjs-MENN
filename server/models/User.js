const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    providerId: String,
    providerType: String,
    email: {
        type: String,
        sparse: true
    },
    name: String,
    avatar: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);