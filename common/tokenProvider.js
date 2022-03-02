const jwt = require('jsonwebtoken');

const accessToken = (user) => {
    const token = jwt.sign(user, process.env.PRIVATE_KEY_ACCESS_TOKEN,{ expiresIn: '20s' })
    return token
}

const refreshToken = (user) => {
    const token = jwt.sign(user, process.env.PRIVATE_KEY_REFRESH_TOKEN,{ expiresIn: '365d' })
    return token
}

module.exports = {
    accessToken,
    refreshToken
}