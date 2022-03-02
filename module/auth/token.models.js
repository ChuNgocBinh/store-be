const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user' },
    token: [{type: String}],

}, {
    timestamp: true,
})

const TokenModel = mongoose.model('token', TokenSchema)
module.exports = TokenModel