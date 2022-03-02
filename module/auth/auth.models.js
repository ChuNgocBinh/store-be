const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
    username: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'https://vi.wikipedia.org/wiki/T%E1%BA%ADp_tin:User_icon_2.svg'}
}, {
    timestamp: true,
})

const AuthModel = mongoose.model('user', AuthSchema)
module.exports = AuthModel