const crypto = require("crypto")

exports.SHA256 = function (text) {
    return crypto.createHash('sha256').update(text).digest('base64')
}

